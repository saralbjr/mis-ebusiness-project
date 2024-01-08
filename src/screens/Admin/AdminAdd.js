import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';

const AdminAdd = () => {
    const [showModal, setShowModal] = useState(false);
    const [itemData, setItemData] = useState({
        name: '',
        categoryName: '',
        option330MLPrice: '',
        option650MLPrice: '',
        imageUrl: '',
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/categories');
                console.log(response.data)
                setCategories(response.data);
                // console.log(categories)
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchCategories();
    }, []);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/items/add', {
                name: itemData.name,
                CategoryName: itemData.categoryName,
                options:[
                {
                    "330ML": itemData.option330MLPrice,
                    "650ML": itemData.option650MLPrice
                }
            ],
                imageUrl: itemData.imageUrl

            });

            if (response.data.success) {
                handleClose();
                // Optionally, redirect to the admin page or handle success in some way
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className='edit-admin'>
            <Button variant="primary" onClick={handleShow}>
                Add Item
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="itemName">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter item name"
                                name="name"
                                value={itemData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="itemImageUrl">
                            <Form.Label>Item Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="imageUrl"
                                placeholder="Enter image URL"
                                value={itemData.imageUrl}
                                onChange={handleChange}
                            />
                        </Form.Group>


                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                name="categoryName"
                                value={itemData.categoryName}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select a category</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category.CategoryName}>
                                        {category.CategoryName}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="option330MLPrice">
                            <Form.Label>330ML Price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter 330ML price"
                                name="option330MLPrice"
                                value={itemData.option330MLPrice}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="option650MLPrice">
                            <Form.Label>650ML Price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter 650ML price"
                                name="option650MLPrice"
                                value={itemData.option650MLPrice}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminAdd;
