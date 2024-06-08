import React, { useState, useEffect } from 'react';
import { useDeleteRaporMutation } from '../../api/raporApi';
import { TextInput, Button, Group, Alert } from '@mantine/core';

function RaporSilForm() {
  const [dosyaNumarasi, setDosyaNumarasi] = useState('');
  const [deleteRapor, { isLoading, isSuccess, isError, error }] = useDeleteRaporMutation();
  const [notification, setNotification] = useState('');

  const containerStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '40px auto',
  };

  const deleteButtonStyle = {
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    marginTop: '20px',
    borderRadius: '4px',
    fontSize: '16px',
  };

  useEffect(() => {
    if (isSuccess) {
      setNotification('Rapor başarıyla silindi.');
      setTimeout(() => {
        setNotification('');
      }, 2000);
    }
    if (isError) {
      setNotification(error?.data?.message || 'Bir hata oluştu.');
    }
  }, [isSuccess, isError, error]);

  const handleDelete = async () => {
    if (!/^\d+$/.test(dosyaNumarasi)) {
      setNotification('Dosya numarası sadece sayılardan oluşmalıdır.');
      return;
    }
    await deleteRapor(dosyaNumarasi);
    setDosyaNumarasi('');
  };

  return (
    <div style={containerStyle}>
      {notification && <Alert color={isError ? 'red' : 'green'}>{notification}</Alert>}
      <form onSubmit={(e) => e.preventDefault()}>
        <Group direction="column" grow>
          <TextInput
            label="Rapor Dosya Numarası"
            placeholder="Dosya Numarası"
            value={dosyaNumarasi}
            onChange={(e) => setDosyaNumarasi(e.target.value)}
            required
          />
          <Button type="submit" onClick={handleDelete} style={deleteButtonStyle} disabled={isLoading}>
            {isLoading ? 'Siliniyor...' : 'Rapor Sil'}
          </Button>
        </Group>
      </form>
    </div>
  );
}

export default RaporSilForm;
