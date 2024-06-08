import React, { useState } from 'react';

const LogoutComponent = () => {
  const [message, setMessage] = useState('');

  const buttonStyle = {
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    marginTop: '20px',
    borderRadius: '4px',
    fontSize: '16px',
  };

  const handleLogout = () => {
    localStorage.removeItem('userTypeToken');
    
    setMessage('Çıkış yapıldı.');
    setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  return (
    <div>
      <button onClick={handleLogout} style={buttonStyle}>Logout</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LogoutComponent;
