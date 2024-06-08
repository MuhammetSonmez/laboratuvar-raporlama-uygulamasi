import React, { useState } from 'react';
import { useUpdateLaborantMutation } from '../../api/laborantApi';
import { TextInput, Button, Group, Alert } from '@mantine/core';

function LaborantDuzenleForm({ mevcutLaborant = {} }) {
  const { adi = '', soyadi = '', hastaneKimlikNumarasi = '' } = mevcutLaborant;
  const [ad, setAd] = useState(adi);
  const [soyad, setSoyad] = useState(soyadi);
  const [hastaneKimlikNumara, setHastaneKimlikNumarasi] = useState(hastaneKimlikNumarasi);
  const [updateLaborant] = useUpdateLaborantMutation();
  const [notification, setNotification] = useState('');
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
  const isNumeric = (value) => /^\d+$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUserType = localStorage.getItem('userTypeToken');
    if (storedUserType === null) {
      setNotification("Buna yetkiniz yok. Lütfen giriş yapınız");
      return;
    }

    if (!isNumeric(hastaneKimlikNumara)) {
      setNotification('Hastane kimlik numarası sadece sayılardan oluşmalıdır.');
      return;
    }
    if (hastaneKimlikNumara.length !== 7) {
      setNotification('Hastane kimlik numarası 7 haneli olmalıdır.');
      return;
    }

    try {
      const response = await updateLaborant({ adi: ad, soyadi: soyad, hastaneKimlikNumarasi: hastaneKimlikNumara });
      console.log("response: ", response);
      if (response.data.hastaneKimlikNumarasi.length === 7) {
        throw new Error("404");
      } else {
        console.log("başarılı!")
        setNotification('Laborant başarıyla güncellendi.');
        setTimeout(() => {
          setNotification('');
        }, 2000);
      }
      
      setAd('');
      setSoyad('');
      setHastaneKimlikNumarasi('');
    } catch (error) {
      if (error.message === "404") {
        setNotification('Laborant bulunamadı.');
      } else {
        console.log(error.message);
        setNotification('Bir hata ile karşılaşıldı');
      }
    }
    
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {notification && <Alert color="green">{notification}</Alert>}
      <Group direction="column" grow>
        <TextInput
          label="Ad"
          placeholder="Laborant adı"
          value={ad}
          onChange={(e) => setAd(e.target.value)}
          required
        />
        <TextInput
          label="Soyad"
          placeholder="Laborant soyadı"
          value={soyad}
          onChange={(e) => setSoyad(e.target.value)}
          required
        />
        <TextInput
          label="Hastane Kimlik Numarası"
          placeholder="Laborant Hastene Kimlik Numarası"
          value={hastaneKimlikNumara}
          onChange={(e) => setHastaneKimlikNumarasi(e.target.value)}
          required
        />
        <Button type="submit" style={buttonStyle}>Laborant Güncelle</Button>
      </Group>
    </form>
  );
}

export default LaborantDuzenleForm;
