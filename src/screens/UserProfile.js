import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './UserProfile.css';

const UserInfo = () => {
    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
    const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingUsername, setIsEditingUsername] = useState(false);

    const handleEditClick = (field) => {
        if (field === 'email') {
            setIsEditingEmail(true);
        } else if (field === 'username') {
            setIsEditingUsername(true);
        }
    };

    const handleSaveClick = (field) => {
        if (field === 'email') {
            // Add logic to save changes for email
            setIsEditingEmail(false);
        } else if (field === 'username') {
            // Add logic to save changes for username
            setIsEditingUsername(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="user-info-container">
                <div className="user-info-box">
                    <h2>Profile Information</h2>
                    <hr />
                    <div>
                        <div className="info-item">
                            <p><b>Email:</b></p>
                            {isEditingEmail ? (
                                <>
                                    <input
                                        type="text"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                    />
                                    <button className="edit-button" onClick={() => handleSaveClick('email')}>Save</button>
                                </>
                            ) : (
                                <>
                                    <p>{userEmail}</p>
                                    <button className="edit-button" onClick={() => handleEditClick('email')}>Edit</button>
                                </>
                            )}
                        </div>
                        <div className="info-item">
                            <p><b>Username: </b></p>
                            {isEditingUsername ? (
                                <>
                                    <input
                                        type="text"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                    <button className="edit-button" onClick={() => handleSaveClick('username')}>Save</button>
                                </>
                            ) : (
                                <>
                                    <p>{userName}</p>
                                    <button className="edit-button" onClick={() => handleEditClick('username')}>Edit</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserInfo;
