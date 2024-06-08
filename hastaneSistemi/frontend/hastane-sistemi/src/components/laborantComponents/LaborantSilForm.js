import React, { useState, useEffect } from 'react';
import { useDeleteLaborantMutation } from '../../api/laborantApi'; 
import { TextInput, Button, Group, Alert } from '@mantine/core';


function LaborantSilForm() {
  const [hastaneKimlikNumarasi, setHastaneKimlikNumarasi] = useState('');
  const [deleteLaborant, { isLoading, isSuccess, isError, error }] = useDeleteLaborantMutation();
  const [notification, setNotification] = useState('');
  const containerStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px', margin: '40px auto' 
  };
  const deleteButtonStyle = { 
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none', 
    padding: '10px 20px', 
    cursor: 'pointer', 
    marginTop: '20px', 
    borderRadius: '4px', 
    fontSize: '16px' 
  };
  useEffect(() => {
    if (isSuccess) {
      setNotification('Laborant başarıyla silindi.');
      setTimeout(() => {
        setNotification('');
      }, 2000);
    }
  }, [isSuccess]);

  const handleDelete = async () => {
    const storedUserType = localStorage.getItem('userTypeToken');
    if (storedUserType===null){
      setNotification("Buna yetkiniz yok. Lütfen giriş yapınız");
      return;
    }
    else if (storedUserType === "USER"){
      setNotification("Silme işlemini sadece admin yapabilir.");
      return;
    }
    if (!/^\d+$/.test(hastaneKimlikNumarasi)) {
      setNotification('Hastane kimlik numarası sadece sayılardan oluşmalıdır.');
      return;
    }
    if (hastaneKimlikNumarasi.length !== 7) {
      setNotification('Hastane kimlik numarası 7 haneli olmalıdır.');
      return;
    }
  
    try {
      await deleteLaborant(hastaneKimlikNumarasi);
      setNotification('Laborant başarıyla silindi.');
      setTimeout(() => {
        setNotification('');
      }, 2000);
      setHastaneKimlikNumarasi('');
    } catch (error) {
      setNotification('Bir hata oluştu, lütfen tekrar deneyin.');
    }
  };
  

  return (
    <div style={containerStyle}>
      {notification && <Alert color={isError ? 'red' : 'green'}>{notification || error}</Alert>}
      <form onSubmit={(e) => e.preventDefault()}>
        <Group direction="column" grow>
          <TextInput
            label="Hastane Kimlik Numarası"
            placeholder="7 haneli hastane kimlik numarası"
            value={hastaneKimlikNumarasi}
            onChange={(e) => setHastaneKimlikNumarasi(e.target.value)}
            required
          />
          <Button onClick={handleDelete} style={deleteButtonStyle} disabled={isLoading}>
            {isLoading ? 'Siliniyor...' : 'Laborant Sil'}
          </Button> 
        </Group>
      </form>
    </div>
  );
}

export default LaborantSilForm;
