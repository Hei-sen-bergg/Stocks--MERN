import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div className='text-center'  style={{backgroundColor: '#F1FAFF',margin: 0, padding: 0, height: '80vh', width: '30vw', borderRadius:'20px'}}>
      <h3 className='text-center' style={{ fontWeight: '900', marginBlock:'20px',padding:0}}>Welcome to Upstocks</h3>
      {isLogin ? <Login /> : <Register />}
      <a href="#" onClick={handleToggle} className='mt-5 fw-bold'>
     {isLogin ? 'If you are a new user, click here to register !' : 'If you are an existing user, click here to login !'}
      </a>
    </div>
    </div>
  );      
};

export default LoginRegisterPage;
