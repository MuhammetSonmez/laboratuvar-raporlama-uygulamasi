import React, { useState } from 'react';
import { useRegisterUserMutation } from '../../api/userApi';

const RegisterComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tcKimlikNumarasi, setTcKimlikNumarasi] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [registerUser] = useRegisterUserMutation();
  const formStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '40px auto'
  };

  const buttonStyle = {
    backgroundColor: '#28a745', // Register butonu için yeşil renk
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    marginTop: '20px',
    borderRadius: '4px',
    fontSize: '16px'
  };
  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!validateTCKimlikNumarasi(tcKimlikNumarasi)) {
      setErrorMessage('TC Kimlik Numarası geçersiz.');
      setSuccessMessage('');
      return;
    }
  
    try {
      const response = await registerUser({ username, password, tcKimlikNumarasi });
      console.log('User registered:', response);
      
      if (response.data) {
        setSuccessMessage('Kullanıcı başarıyla kaydedildi.');
        setErrorMessage('');
      } else {
        setErrorMessage('Kayıt işlemi başarısız oldu, kullanıcı adı ve tc kimlik numarası benzersiz olmalı.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Failed to register:', error);
      setErrorMessage('Kayıt işlemi başarısız oldu.');
      setSuccessMessage('');
    }
  };
  

  const validateTCKimlikNumarasi = (tcKimlikNumarasi) => {
    if (tcKimlikNumarasi.length !== 11 || isNaN(tcKimlikNumarasi)) {
      return false;
    }
    return true;
  };

  return (
    <div style={formStyle}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
        <input
          type="text"
          placeholder="TC Kimlik Numarası"
          value={tcKimlikNumarasi}
          onChange={(e) => setTcKimlikNumarasi(e.target.value)}
          required
          />
        <button type="submit" style={buttonStyle}>Register</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </form>
    </div>
  );
};

export default RegisterComponent;
