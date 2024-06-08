import React, { useState } from 'react';
import { useUpdateRaporMutation } from '../../api/raporApi';
import { TextInput, Textarea, Button, Group, Alert } from '@mantine/core';
import { formatISO } from 'date-fns';

function RaporDuzenleForm({ mevcutRapor = {} }) {
  const { dosyaNumarasi: dosyaNumarasiMevcut = '', hastaAdi: hastaAdiMevcut = '', hastaSoyadi: hastaSoyadiMevcut = '', hastaTc: hastaTcMevcut = '', taniBasligi: taniBasligiMevcut = '', taniDetaylari: taniDetaylariMevcut = '', verilmeTarihi: verilmeTarihiMevcut = '', hastaneKimlikNumarasi: hastaneKimlikNumarasiMevcut = '' } = mevcutRapor;

  const [dosyaNumarasi, setDosyaNumarasi] = useState(dosyaNumarasiMevcut);
  const [hastaAdi, setHastaAdi] = useState(hastaAdiMevcut);
  const [hastaSoyadi, setHastaSoyadi] = useState(hastaSoyadiMevcut);
  const [hastaTc, setHastaTc] = useState(hastaTcMevcut);
  const [taniBasligi, setTaniBasligi] = useState(taniBasligiMevcut);
  const [taniDetaylari, setTaniDetaylari] = useState(taniDetaylariMevcut);
  const [verilmeTarihi, setVerilmeTarihi] = useState(verilmeTarihiMevcut);
  const [hastaneKimlikNumarasi, setHastaneKimlikNumarasi] = useState(hastaneKimlikNumarasiMevcut);
  const [fotograf, setFotograf] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const formStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '40px auto'
  };

  const buttonStyle = {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    marginTop: '20px',
    borderRadius: '4px',
    fontSize: '16px'
  };

  const [updateRapor] = useUpdateRaporMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUserType = localStorage.getItem('userTypeToken');
    if (storedUserType===null){
      setError("Buna yetkiniz yok. Lütfen giriş yapınız");
      return;
    }
    else if (storedUserType === "USER"){
      setError("Silme işlemini sadece admin yapabilir.");
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
        const response = await updateRapor({ dosyaNumarasi, ...formData });
        if (response.error) {
          setError('Rapor güncelleme başarısız oldu.');
        } else {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 3000);
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
        {success && <Alert color="blue">Rapor başarıyla güncellendi!</Alert>}
        <TextInput
          label="Dosya Numarası"
          placeholder="Dosya Numarası"
          value={dosyaNumarasi}
          onChange={(e) => setDosyaNumarasi(e.target.value)}
        />
        <TextInput
          label="Hasta Adı"
          placeholder="Hasta adı"
          value={hastaAdi}
          onChange={(e) => setHastaAdi(e.target.value)}
        />
        <TextInput
          label="Hasta Soyadı"
          placeholder="Hasta soyadı"
          value={hastaSoyadi}
          onChange={(e) => setHastaSoyadi(e.target.value)}
        />
        <TextInput
          label="Hasta TC"
          placeholder="Hasta TC"
          value={hastaTc}
          onChange={(e) => setHastaTc(e.target.value)}
        />
        <TextInput
          label="Tanı Başlığı"
          placeholder="Tanı başlığı"
          value={taniBasligi}
          onChange={(e) => setTaniBasligi(e.target.value)}
        />
        <Textarea
          label="Tanı Detayları"
          placeholder="Tanı detayları"
          value={taniDetaylari}
          onChange={(e) => setTaniDetaylari(e.target.value)}
        />
        <input
          type="date"
          label="Rapor Tarihi"
          value={verilmeTarihi}
          onChange={(e) => setVerilmeTarihi(e.target.value)}
        />
        <TextInput
          label="Hastane Kimlik Numarası"
          placeholder="Hastane kimlik numarası"
          value={hastaneKimlikNumarasi}
          onChange={(e) => setHastaneKimlikNumarasi(e.target.value)}
        />
         <input
          type="file"
          onChange={(e) => setFotograf(e.target.files[0])} 
        />
        <Button type="submit" style={buttonStyle}>Raporu Güncelle</Button>
      </Group>
    </form>
  );
}

export default RaporDuzenleForm;
