import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import './Admin.css'; // Import your CSS file
import AdminAdd from './AdminAdd';
import { Button, Modal, Form } from 'react-bootstrap';
import Login from './AdminLogin';

const Admin = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [items, setItems] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedItem, setEditedItem] = useState({
    _id: '',
    name: '',
    CategoryName: '',
    option330MLPrice: '',
    option650MLPrice: '',
    img: '',
  });

  useEffect(() => {
    // Check if the user is logged in
    const storedLoginStatus = localStorage.getItem('adminLoggedIn');
    if (storedLoginStatus === 'true') {
      setLoggedIn(true);
    }

    if (isLoggedIn) {
      const fetchItems = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/auth/items');
          setItems(response.data);
        } catch (error) {
          console.error(error.message);
        }
      };

      fetchItems();
    }
  }, [isLoggedIn]);

  const handleDelete = async (itemId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/auth/items/delete/${itemId}`);

        if (response.data.success) {
          setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
          console.log(response.data.message);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleEdit = (item) => {
    setEditedItem({
      _id: item._id,
      name: item.name,
      CategoryName: item.CategoryName,
      option330MLPrice: item.options.find((option) => option.hasOwnProperty('330ML'))['330ML'],
      option650MLPrice: item.options.find((option) => option.hasOwnProperty('650ML'))['650ML'],
      img: item.img,
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditedItem({
      _id: '',
      name: '',
      CategoryName: '',
      option330MLPrice: '',
      option650MLPrice: '',
      img: '',
    });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/auth/items/update/${editedItem._id}`, {
        name: editedItem.name,
        CategoryName: editedItem.CategoryName,
        options: [
          {
            "330ML": editedItem.option330MLPrice,
            "650ML": editedItem.option650MLPrice
          }
        ],
        imageUrl: editedItem.img,
      });

      if (response.data.success) {
        handleCloseEditModal();
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
      {isLoggedIn ? (
        <>
          <AdminAdd />
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
                      <button className='btn-danger btn-md me-2' onClick={() => handleDelete(item._id)}>Delete</button>
                      <button className='btn-success btn-md' onClick={() => handleEdit(item)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit Modal */}
          <Modal show={showEditModal} onHide={handleCloseEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="itemName">
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter item name"
                    name="name"
                    value={editedItem.name}
                    onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="itemImageUrl">
                  <Form.Label>Item Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="imageUrl"
                    placeholder="Enter image URL"
                    value={editedItem.img}
                    onChange={(e) => setEditedItem({ ...editedItem, img: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="option330MLPrice">
                  <Form.Label>Updated 330ML Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter updated 330ML price"
                    name="option330MLPrice"
                    value={editedItem.option330MLPrice}
                    onChange={(e) => setEditedItem({ ...editedItem, option330MLPrice: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="option650MLPrice">
                  <Form.Label>Updated 650ML Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter updated 650ML price"
                    name="option650MLPrice"
                    value={editedItem.option650MLPrice}
                    onChange={(e) => setEditedItem({ ...editedItem, option650MLPrice: e.target.value })}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleEditSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <Login setLoggedIn={(status) => {
          setLoggedIn(status);
          localStorage.setItem('adminLoggedIn', status);
        }} />
      )}
    </>
  );
};

export default Admin;
