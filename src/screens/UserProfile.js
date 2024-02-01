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
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                        <div style={{ display: 'flex', marginBottom: '8px' }}>
                            <p style={{ minWidth: '100px', margin: '0' }}><b>Email</b></p>
                            <p style={{ margin: '0' }}> <b>:</b> &nbsp;{userEmail}</p>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <p style={{ minWidth: '100px', margin: '0' }}><b>Username</b></p>
                            <p style={{ margin: '0' }}> <b>:</b> &nbsp;{userName}</p>
                        </div>
                    </div>
                    {/* Other UI elements */}
                </div>
            </div>


        </>
    );
};


export default UserInfo;
