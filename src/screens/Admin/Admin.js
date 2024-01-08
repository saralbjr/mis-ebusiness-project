import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import './Admin.css'; // Import your CSS file
import AdminAdd from './AdminAdd';

const Admin = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/items');
        setItems(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      // Make a DELETE request to the server to delete the item
      const response = await axios.delete(`http://localhost:5000/api/auth/items/delete/${itemId}`);

      if (response.data.success) {
        // If the deletion was successful, update the state to reflect the changes
        setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
        console.log(response.data.message);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <AdminAdd/>
      <div className='admin-panel'>
        <h1 className='admin-heading'>Admin Dashboard</h1>
        <table className='admin-table'>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Options</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.CategoryName}</td>
                <td>
                  {item.options && item.options.length > 0 ? (
                    <ul>
                      {item.options.map((option, optionIndex) => (
                        <li key={optionIndex}>
                          {Object.entries(option).map(([size, price]) => (
                            <div key={size}>
                              <span>{size}:</span> Rs.{price}
                            </div>
                          ))}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    'No options available'
                  )}
                </td>
                <td>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Admin;
