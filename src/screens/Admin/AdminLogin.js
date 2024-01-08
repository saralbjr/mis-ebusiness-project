import React, { useState } from 'react';
import './Admin.css';

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Check if the entered credentials match your predefined values
    if (username === 'admin' && password === 'admin') {
      // Set the user as logged in
      setLoggedIn(true);
    } else {
      // Display an error message or handle the login failure
      setError('INVALID CREDENTIALS!');
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://cdn.vox-cdn.com/thumbor/8zX9C04GCHA9HvJR7PjsJneqLUg=/0x0:2600x1733/1200x800/filters:focal(1092x659:1508x1075)/cdn.vox-cdn.com/uploads/chorus_image/image/66554227/shutterstock_616076909.0.jpg")',
        height: '100vh',
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className='container-dark'>
        <h2 className='text-center'>Admin Login</h2>
        {error && <p className='error-message text-center m-2 text-danger '>{error}</p>}
        <div className='text-center m-3'>
          <label>
            Username:
            <input type='text' className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div>
        <div className='text-center m-3'>
          <label>
            Password:
            <input type='password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <div className='text-center'>
          <button className='btn btn-success' onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;