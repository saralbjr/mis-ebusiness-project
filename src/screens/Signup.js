import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Signup.css';

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "", geolocation: "" });
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (credentials.password !== credentials.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Clear previous password error
    setPasswordError("");

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem('token', json.authToken);
      localStorage.setItem('userName', credentials.name);
      navigate("/login");
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ backgroundImage: 'url("https://cdn.vox-cdn.com/thumbor/8zX9C04GCHA9HvJR7PjsJneqLUg=/0x0:2600x1733/1200x800/filters:focal(1092x659:1508x1075)/cdn.vox-cdn.com/uploads/chorus_image/image/66554227/shutterstock_616076909.0.jpg")', backgroundSize: 'cover', height: '100vh' }}>
      <div>
        <Navbar />
      </div>
      <br /> <br /> <br /> <br />
      <div className='container'>
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
          </div>
          <div className="m-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
          </div>
          <div className="m-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" name='confirmPassword' value={credentials.confirmPassword} onChange={onChange} />
          </div>
          {passwordError && <div className="alert alert-danger">{passwordError}</div>}
          <div className='submit-btn'>
            <button type="submit" className="btn btn-success">Register</button>
            <Link to="/login" className="mx-1 btn btn-danger">Already a user</Link>
          </div>
        </form>
      </div>
    </div>
  );
}