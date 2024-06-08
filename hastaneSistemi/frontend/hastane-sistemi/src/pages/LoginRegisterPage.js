import React from 'react';
import LoginComponent from '../components/userComponents/LoginComponent';
import RegisterComponent from '../components/userComponents/RegisterComponent';

function LoginPage (){
  return (
    <div>
      <LoginComponent />
      <RegisterComponent/>
    </div>
  );
};

export default LoginPage;
