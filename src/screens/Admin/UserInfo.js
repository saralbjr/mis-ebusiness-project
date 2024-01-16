import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Loading from '.././Loading';
import { Link } from 'react-router-dom';

const UserInfo = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/users");
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBanUser = async (userId) => {
    const isConfirmed = window.confirm("Are you sure you want to ban this user?");
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/users/ban/${userId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Update the user data after banning the user
          const updatedUserData = userData.filter(user => user._id !== userId);
          setUserData(updatedUserData);
        } else {
          console.log('Failed to ban user.');
        }
      } catch (error) {
        console.error('Error banning user:', error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <br /> <br /> <br /> <br/> <br/>
      <div className='d-flex justify-content-center'>
        <Link to="/admin/ordersdata" className="btn btn-primary">
          Go to Orders Data
        </Link>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className='container'>
          <h3 className="fs-7 mt-4 mb-4 d-flex justify-content-center">User Information</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.date}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleBanUser(user._id)}>
                      Ban
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
