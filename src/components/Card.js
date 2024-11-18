import React, { useState, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
import './Card.css';

export default function Card(props) {
  const { foodName, price, ImgSrc, item } = props;
  const dispatch = useDispatchCart();
  const cart = useCart();

  const [qty, setQty] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  const handleAddToCart = async () => {
    // Check if the item already exists in the cart
    const existingItem = cart.find((cartItem) => cartItem.id === item._id);

    if (existingItem) {
      await dispatch({
        type: 'UPDATE',
        id: item._id,
        price: qty * price,
        qty: existingItem.qty + qty,
      });
    } else {
      await dispatch({
        type: 'ADD',
        id: item._id,
        name: foodName,
        price: qty * price,
        qty: qty,
        img: ImgSrc,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Save to localStorage
    setShowMessage(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(false), 1500);
    return () => clearTimeout(timer);
  }, [showMessage]);

  return (
    <div className="mb-4">
      <div className="card mt-3 d-flex flex-column" style={{ maxWidth: '18rem' }}>
        <img
          src={ImgSrc}
          className="card-img-top"
          alt={foodName}
          style={{ height: '250px', objectFit: 'contain' }}
        />
        <div className="card-body text-center">
          <h5 className="card-title">{foodName}</h5>
          <div className="d-flex justify-content-center align-items-center mb-3">
            <select
              className="m-2 bg-success text-white rounded"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              style={{ width: '70px', textAlign: 'center' }}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <div className="fs-5">Rs. {price}</div>
          </div>
          <button
            className="btn btn-success w-100 mt-2"
            onClick={handleAddToCart}
            style={{ borderRadius: '20px' }}
          >
            Add to Cart
          </button>
          {showMessage && (
            <div className="modal-container">
              <div className="added-to-cart-message">Added to Cart Successfully</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
