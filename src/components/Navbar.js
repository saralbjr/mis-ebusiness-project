import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import logoImage from './Images/raksi1.png';
import './Navbar.css';

export default function Navbar({ showWelcome, welcomeMessage }) {
    const [cartView, setCartView] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const navigate = useNavigate();
    const items = useCart();
    const navbarRef = useRef(null);

    useEffect(() => {
        const storedEmail = localStorage.getItem('userName');
        if (localStorage.getItem('token') && storedEmail) {
            setUserEmail(storedEmail);
        }
    }, []);

    const handleProfileClick = () => {
        setShowProfileDropdown(!showProfileDropdown);
    };

    const handleLogout = () => {
        const isConfirmed = window.confirm('Are you sure you want to logout?');
        if (isConfirmed) {
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            navigate('/login');
        }
    };

    const loadCart = () => {
        setCartView(true);
    };

    return (
        <div>
            <nav
                id="navbar"
                ref={navbarRef}
                className="navbar navbar-expand-lg navbar-dark bg-success"
                style={{
                    boxShadow: '0px 10px 20px black',
                    filter: 'blur(20)',
                    position: 'fixed',
                    zIndex: '10',
                    width: '100%',
                }}
            >

                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
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
                            {localStorage.getItem('token') && (
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorder">
                                        My Orders
                                    </Link>
                                </li>
                            )}
                        </ul>
                        <div className="navbar-text d-flex align-items-center">
                            <div className="mx-auto">
                                {showWelcome && (
                                    <p className="text-center text-white">{welcomeMessage}</p>
                                )}
                            </div>
                        </div>
                        {localStorage.getItem('token') && (
                            <div className="profile-dropdown">
                                <div className="animated-button" onClick={handleProfileClick}>
                                    {userEmail && <span>{userEmail} </span>}<span>&#9660;</span>
                                </div>
                                {showProfileDropdown && (
                                    <div className="profile-options">
                                        <Link to="/profile">Profile</Link>
                                    </div>
                                )}
                            </div>
                        )}
                        {!localStorage.getItem('token') ? (
                            <form className="d-flex">
                                <div className="login">
                                    <Link className="btn bg-white text-success mx-1" to="/login">
                                        Login
                                    </Link>
                                    <Link className="btn bg-white text-success mx-1" to="/signup">
                                        Signup
                                    </Link>
                                </div>
                            </form>
                        ) : (
                            <div className="buttons">
                                <div className="animated-button" onClick={loadCart}>
                                    <Badge color="secondary" badgeContent={items.length}>
                                        <ShoppingCartIcon />
                                    </Badge>
                                    Cart
                                </div>
                                {cartView && (
                                    <Modal onClose={() => setCartView(false)}>
                                        <Cart />
                                    </Modal>
                                )}
                                <button onClick={handleLogout} className="animated-button">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
