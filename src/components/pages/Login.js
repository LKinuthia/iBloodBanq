import React from 'react';
import '../../App.css';
import LoginForm from '../LoginForm';

function Login({onLoginSuccess}) {
  return (
    <>
      <LoginForm onLoginSuccess={onLoginSuccess} />
    </>
  );
}

export default Login;