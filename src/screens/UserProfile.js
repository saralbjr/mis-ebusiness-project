import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './UserProfile.css'

const UserInfo = () => {
    const [userEmail] = useState(localStorage.getItem('userEmail') || '');
    const [userName] = useState(localStorage.getItem('userName') || '');

    return (
        <>
            <Navbar />
            <div className="user-info-container">
                <div className="user-info-box">
                    <h2 style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>Your Information</h2>
                    <hr style={{ display: 'inline-block', marginLeft: '10px', width: 'calc(100% - 70px)' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <p style={{ textAlign: 'left', margin: '0' }}><b>Email:</b></p>
                            <p style={{ textAlign: 'right', margin: '0' }}>{userEmail}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p style={{ textAlign: 'left', margin: '0' }}><b>Username:</b></p>
                            <p style={{ textAlign: 'right', margin: '0' }}>{userName}</p>
                        </div>
                    </div>
                    {/* Other UI elements */}
                </div>
            </div>
        </>
    );
};


export default UserInfo;
