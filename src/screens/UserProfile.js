import React, { useState } from 'react';
import Navbar from '../components/Navbar';
const UserInfo = () => {
    const [userEmail] = useState(localStorage.getItem('userEmail') || '');
    const [userName] = useState(localStorage.getItem('userName') || '');

    return (
        <>
            <Navbar />
            <div className="user-info-container">

                <div className="user-info-box">
                    <h2>User Information</h2>
                    <p>Email: {userEmail}</p>
                    <p>Name: {userName}</p>
                    {/* Other UI elements */}
                </div>
            </div>
        </>
    );
};


export default UserInfo;
