import React from 'react';
import { useGetRaporlarQuery } from '../../api/raporApi';
import { Table, Loader, Alert } from '@mantine/core';
import { format, isValid } from 'date-fns';

function RaporListForm() {
  const { data, error, isLoading } = useGetRaporlarQuery();
  const tableStyle = {
    width: '100%',
    marginTop: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderCollapse: 'collapse'
  };

  const cellStyle = {
    padding: '10px',
    borderBottom: '1px solid #dee2e6',
    textAlign: 'left'
  };
  if (isLoading) return <Loader />;
  if (error) return <Alert color="red">Error fetching raporlar</Alert>;

  return (
    <Table style={tableStyle}>
      <thead>
        <tr>
          <th style={{ ...cellStyle, backgroundColor: '#007bff', color: 'white' }}>Dosya Numarası</th>
          <th style={{ ...cellStyle, backgroundColor: '#007bff', color: 'white' }}>Hasta Adı</th>
          <th style={{ ...cellStyle, backgroundColor: '#007bff', color: 'white' }}>Hasta Soyadı</th>
          <th style={{ ...cellStyle, backgroundColor: '#007bff', color: 'white' }}>Hasta TC</th>
          <th style={{ ...cellStyle, backgroundColor: '#007bff', color: 'white' }}>Tanı Başlığı</th>
          <th style={{ ...cellStyle, backgroundColor: '#007bff', color: 'white' }}>Tanı Detayları</th>
          <th style={{ ...cellStyle, backgroundColor: '#007bff', color: 'white' }}>Rapor Tarihi</th>
          <th style={{ ...cellStyle, backgroundColor: '#007bff', color: 'white' }}>Fotoğraf</th>
          <th style={{ ...cellStyle, backgroundColor: '#007bff', color: 'white' }}>Hastane Kimlik Numarası</th>
        </tr>
      </thead>
      
      <tbody>
        {data.map((rapor) => (
          <tr key={rapor.id}>
            <td style={cellStyle}>{rapor.dosyaNumarasi}</td>
            <td style={cellStyle}>{rapor.hastaAdi}</td>
            <td style={cellStyle}>{rapor.hastaSoyadi}</td>
            <td style={cellStyle}>{rapor.hastaTc}</td>
            <td style={cellStyle}>{rapor.taniBasligi}</td>
            <td style={cellStyle}>{rapor.taniDetaylari}</td>
            <td style={cellStyle}>{isValid(new Date(rapor.verilmeTarihi)) ? format(new Date(rapor.verilmeTarihi), 'dd/MM/yyyy') : 'Invalid Date'}</td>
            <td style={cellStyle}><img src={`data:image/jpeg;base64,${rapor.fotografUrl}`} alt="Rapor Fotoğrafı"  style={{ maxWidth: '100%', maxHeight: '200px' }} /></td> 
            <td style={cellStyle}>{rapor.hastaneKimlikNumarasi}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default RaporListForm;
