// RaporSearchForm.js
import React, { useState } from 'react';
import { useSearchRaporlarQuery } from '../../api/raporApi'; 

const RaporSearchForm = () => {
  const [searchParams, setSearchParams] = useState({
    hastaAdi: '',
    hastaSoyadi: '',
    hastaTc: '',
    laborantAdi: '',
    laborantSoyadi: ''
  });

  const { data, error, isLoading } = useSearchRaporlarQuery(searchParams);

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
    margin: 'auto',
    gap: '10px'
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ced4da'
  };

  const tableStyle = {
    width: '100%',
    marginTop: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderCollapse: 'collapse'
  };

  const thStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px',
    borderBottom: '1px solid #dee2e6'
  };

  const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #dee2e6'
  };

  return (
    <div>
      <div style={formStyle}>
        <input type="text" value={searchParams.hastaAdi} onChange={(e) => setSearchParams({ ...searchParams, hastaAdi: e.target.value })} placeholder="Hasta Adı" style={inputStyle} />
        <input type="text" value={searchParams.hastaSoyadi} onChange={(e) => setSearchParams({ ...searchParams, hastaSoyadi: e.target.value })} placeholder="Hasta Soyadı" style={inputStyle} />
        <input type="text" value={searchParams.hastaTc} onChange={(e) => setSearchParams({ ...searchParams, hastaTc: e.target.value })} placeholder="Hasta TC" style={inputStyle} />
        <input type="text" value={searchParams.laborantAdi} onChange={(e) => setSearchParams({ ...searchParams, laborantAdi: e.target.value })} placeholder="Laborant Adı" style={inputStyle} />
        <input type="text" value={searchParams.laborantSoyadi} onChange={(e) => setSearchParams({ ...searchParams, laborantSoyadi: e.target.value })} placeholder="Laborant Soyadı" style={inputStyle} />
      </div>
      {isLoading && <div>Yükleniyor...</div>}
      {error && <div>Hata: {error.message}</div>}
      {data && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Dosya Numarası</th>
              <th style={thStyle}>Hasta Adı</th>
              <th style={thStyle}>Hasta Soyadı</th>
              <th style={thStyle}>Hasta TC</th>
              <th style={thStyle}>Tanı Başlığı</th>
              <th style={thStyle}>Verilme Tarihi</th>
              <th style={thStyle}>Fotoğraf URL</th>
              <th style={thStyle}>Hastane Kimlik Numarası</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan="8">Yükleniyor...</td></tr>}
            {error && <tr><td colSpan="8">Hata: {error.message}</td></tr>}
            {data && data.map((rapor) => (
              <tr key={rapor.id}>
                <td style={tdStyle}>{rapor.dosyaNumarasi}</td>
                <td style={tdStyle}>{rapor.hastaAdi}</td>
                <td style={tdStyle}>{rapor.hastaSoyadi}</td>
                <td style={tdStyle}>{rapor.hastaTc}</td>
                <td style={tdStyle}>{rapor.taniBasligi}</td>
                <td style={tdStyle}>{new Date(rapor.verilmeTarihi).toLocaleDateString()}</td>
                <td style={tdStyle}><img src={`data:image/jpeg;base64,${rapor.fotografUrl}`} alt="Rapor Fotoğrafı"  style={{ maxWidth: '100%', maxHeight: '200px' }} /></td> 
                <td style={tdStyle}>{rapor.hastaneKimlikNumarasi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RaporSearchForm;
