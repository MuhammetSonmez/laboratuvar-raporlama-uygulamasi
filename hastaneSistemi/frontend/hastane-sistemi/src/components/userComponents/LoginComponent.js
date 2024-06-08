import React, { useState } from 'react';
import { useLoginUserMutation } from '../../api/userApi';
import { useNavigate } from 'react-router-dom';


const LoginComponent = () => {
  const navigate = useNavigate(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginUser] = useLoginUserMutation();
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
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({ username, password });
      console.log('User logged in:', response);
      
      const userType = response.error.data;
      localStorage.setItem('userTypeToken', userType);
      navigate('/LaborantsPage');
    
      setErrorMessage('');
    } catch (error) {
      console.error('Failed to login:', error);
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div style={formStyle}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}> 
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
        <button type="submit" style={buttonStyle}>Login</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default LoginComponent;
