import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../components/Images/raksi1.png';
import './AdminNavbar.css';

export default function Navbar() {
  const navbarRef = useRef(null);


  // const handleLogout = () => {
  //   localStorage.removeItem('adminLoggedIn');
  //   navigate('/admin'); // Redirect to the login page after logout
  // };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
          if (entry.isIntersecting) {
            navbar.classList.remove('sticky');
          } else {
            navbar.classList.add('sticky');
          }
        }
      },
      { threshold: 0.1 }
    );

    if (navbarRef.current) {
      observer.observe(navbarRef.current);
    }

    // return () => {
    //   if (navbarRef.current) {
    //     observer.unobserve(navbarRef.current);
    //   }
    // };
  }, []);

  return (
    <div>
      <nav
        id="navbar"
        ref={navbarRef}
        className="navbar navbar-expand-lg navbar-dark bg-success"
        style={{ boxShadow: '0px 10px 20px black', filter: 'blur(20)', position: 'fixed', zIndex: '10', width: '100%' }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand " to="/">
            <img src={logoImage} alt="Logo" style={{ width: '100px', height: 'auto' }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
            </ul>
            {/* <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
    </div>
  );
}
