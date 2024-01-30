import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const EditProfile = () => {
    // State variables to store user details
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    // Fetch user details when the component mounts
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                // Make a request to the backend to get user details
                const response = await fetch('http://your-api-url/users/user-info', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const user = await response.json();
                    setEmail(user.email);
                    setName(user.name);
                    // Password is not fetched for security reasons
                } else {
                    console.error('Failed to fetch user details');
                    // Handle error
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserDetails();
    }, []); // Empty dependency array means this effect runs once on mount

    // Handle form submission to update user details
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a request to the backend to update user details
            const response = await fetch('http://localhost:5000/users/update', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    name,
                    password,
                }),
            });

            if (response.ok) {
                // User details updated successfully
                console.log('User details updated successfully');
            } else {
                console.error('Failed to update user details');
                // Handle error
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="user-info-container">
                <div className="user-info-box">
                    <h1>Edit Profile</h1>
                    <form onSubmit={handleSubmit}>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit">Update Profile</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditProfile;
