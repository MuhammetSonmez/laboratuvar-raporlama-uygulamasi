import React, { useState } from 'react';
import { useCreateRaporMutation } from '../../api/raporApi';
import { TextInput, Textarea, Button, Group, Alert } from '@mantine/core';
import { formatISO } from 'date-fns';

function RaporEkleForm() {
  const [dosyaNumarasi, setDosyaNumarasi] = useState('');
  const [hastaAdi, setHastaAdi] = useState('');
  const [hastaSoyadi, setHastaSoyadi] = useState('');
  const [hastaTc, setHastaTc] = useState('');
  const [taniBasligi, setTaniBasligi] = useState('');
  const [taniDetaylari, setTaniDetaylari] = useState('');
  const [verilmeTarihi, setVerilmeTarihi] = useState('');
  const [hastaneKimlikNumarasi, setHastaneKimlikNumarasi] = useState('');
  const [fotograf, setFotograf] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [createRapor] = useCreateRaporMutation();

  const formStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '40px auto'
  };

  const buttonStyle = {
    backgroundColor: '#005f73',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    marginTop: '20px',
    borderRadius: '4px',
    fontSize: '16px'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUserType = localStorage.getItem('userTypeToken');
    if (storedUserType===null){
      setError("Buna yetkiniz yok. Lütfen giriş yapınız");
      return;
    }
    if (!dosyaNumarasi || isNaN(dosyaNumarasi)) {
      setError('Dosya Numarası geçerli bir sayı olmalıdır.');
      return;
    }

    if (!hastaTc || isNaN(hastaTc) || !/^.{11}$/.test(hastaTc)) {
      setError('Hasta TC, 11 haneli geçerli bir sayı olmalıdır.');
      return;
    }

    if (!hastaneKimlikNumarasi || isNaN(hastaneKimlikNumarasi) || !/^.{7}$/.test(hastaneKimlikNumarasi)) {
      setError('Hastane Kimlik Numarası, 7 haneli geçerli bir sayı olmalıdır.');
      return;
    }

    setError(null);

    const formattedRaporTarihi = formatISO(new Date(verilmeTarihi));
    const reader = new FileReader();

    reader.onload = async () => {
      const base64String = reader.result.split(',')[1];
      const formData = {
        dosyaNumarasi,
        hastaAdi,
        hastaSoyadi,
        hastaTc,
        taniBasligi,
        taniDetaylari,
        verilmeTarihi: formattedRaporTarihi,
        fotografUrl: base64String, 
        hastaneKimlikNumarasi,
      };

      try {
        const response = await createRapor(formData);
        if (response.error) {
          setError('Rapor ekleme başarısız oldu.');
        } else {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 3000);
          setDosyaNumarasi('');
          setHastaAdi('');
          setHastaSoyadi('');
          setHastaTc('');
          setTaniBasligi('');
          setTaniDetaylari('');
          setVerilmeTarihi('');
          setHastaneKimlikNumarasi('');
          setFotograf(null);
        }
      } catch (error) {
        setError('Bir hata oluştu, lütfen tekrar deneyin.');
      }
    };

    reader.readAsDataURL(fotograf); 
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <Group direction="column" grow>
        {error && <Alert color="red">{error}</Alert>}
        {success && <Alert color="blue">Rapor başarıyla eklendi!</Alert>}
        <TextInput
          label="Dosya Numarası"
          placeholder="Dosya Numarası"
          value={dosyaNumarasi}
          onChange={(e) => setDosyaNumarasi(e.target.value)}
          required
        />
        <TextInput
          label="Hasta Adı"
          placeholder="Hasta adı"
          value={hastaAdi}
          onChange={(e) => setHastaAdi(e.target.value)}
          required
        />
        <TextInput
          label="Hasta Soyadı"
          placeholder="Hasta soyadı"
          value={hastaSoyadi}
          onChange={(e) => setHastaSoyadi(e.target.value)}
          required
        />
        <TextInput
          label="Hasta TC"
          placeholder="Hasta TC"
          value={hastaTc}
          onChange={(e) => setHastaTc(e.target.value)}
          required
        />
        <TextInput
          label="Tanı Başlığı"
          placeholder="Tanı başlığı"
          value={taniBasligi}
          onChange={(e) => setTaniBasligi(e.target.value)}
          required
        />
        <Textarea
          label="Tanı Detayları"
          placeholder="Tanı detayları"
          value={taniDetaylari}
          onChange={(e) => setTaniDetaylari(e.target.value)}
          required
        />
        <TextInput
          label="Hastane Kimlik Numarası"
          placeholder="Hastane kimlik numarası"
          value={hastaneKimlikNumarasi}
          onChange={(e) => setHastaneKimlikNumarasi(e.target.value)}
          required
        />
        <input
          type="date"
          label="Rapor Tarihi"
          value={verilmeTarihi}
          onChange={(e) => setVerilmeTarihi(e.target.value)}
          required
        />
        
        <input
          type="file"
          onChange={(e) => setFotograf(e.target.files[0])} 
          required
        />
        <Button type="submit" style={buttonStyle}>Rapor Ekle</Button>
      </Group>
    </form>
  );
}

export default RaporEkleForm;
