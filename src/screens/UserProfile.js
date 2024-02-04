import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './UserProfile.css';

const UserInfo = () => {
    const [userEmail] = useState(localStorage.getItem('userEmail') || '');
    const [userName] = useState(localStorage.getItem('userName') || '');

    return (
        <>
            <Navbar />
            <div className="user-info-container">
                <div className="user-info-box">
                    <h2>Your Information</h2>
                    <hr />
                    <div>
                        <div>
                            <p><b>Email:</b></p>
                            <p>{userEmail}</p>
                        </div>
                        <div>
                            <p><b>Username: </b></p>
                            <p>{userName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserInfo;
