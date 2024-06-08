import React, { useState, useEffect } from 'react';
import { useCreateLaborantMutation } from '../../api/laborantApi';
import { TextInput, Button, Group, Alert } from '@mantine/core';

function LaborantEkleForm() {
  const [adi, setAd] = useState('');
  const [soyadi, setSoyad] = useState('');
  const [hastaneKimlikNumarasi, setHastaneKimlikNumarasi] = useState('');
  
  const [notification, setNotification] = useState('');

  const [createLaborant, { isSuccess }] = useCreateLaborantMutation(); 
  const [successMessage, setSuccessMessage] = useState('');
  


  useEffect(() => {
    if (isSuccess) {
      setSuccessMessage('Laborant başarıyla eklendi!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);
    }
  }, [isSuccess]);

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
    const storedUserType = localStorage.getItem('userTypeToken');
    console.log(storedUserType);
    if (storedUserType===null){
      setNotification("Buna yetkiniz yok. Lütfen giriş yapınız");
      return;
    }
    e.preventDefault();
    if (!/^\d+$/.test(hastaneKimlikNumarasi)) {
      setNotification('Hastane kimlik numarası sadece sayılardan oluşmalıdır.');
      return;
    }
    if (!adi || !soyadi || !hastaneKimlikNumarasi) {
      setNotification('Lütfen tüm alanları doldurun.');
      return;
    }
    if (hastaneKimlikNumarasi.length !== 7) {
      setNotification('Hastane kimlik numarası 7 haneli olmalıdır.');
      return;
    }
    try {
      await createLaborant({ adi, soyadi, hastaneKimlikNumarasi });
      setAd('');
      setSoyad('');
      setHastaneKimlikNumarasi('');
      setNotification('');
      setSuccessMessage('Laborant başarıyla eklendi!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);
    } catch (error) {
      setNotification('Bir hata oluştu, lütfen tekrar deneyin.');
    }
  
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {notification && <Alert color="red">{notification}</Alert>}
      {successMessage && <Alert color="green">{successMessage}</Alert>}
      <Group direction="column" grow>
        <TextInput
          label="Ad"
          placeholder="Laborant adı"
          value={adi}
          onChange={(e) => setAd(e.target.value)}
          required
        />
        <TextInput
          label="Soyad"
          placeholder="Laborant soyadı"
          value={soyadi}
          onChange={(e) => setSoyad(e.target.value)}
          required
        />
        <TextInput
          label="Hastane Kimlik Numarası"
          placeholder="7 haneli hastane kimlik numarası"
          value={hastaneKimlikNumarasi}
          onChange={(e) => setHastaneKimlikNumarasi(e.target.value)}
          required
        />
        <Button type="submit" style={buttonStyle}>Laborant Ekle</Button>
      </Group>
    </form>
  );
}

export default LaborantEkleForm;
