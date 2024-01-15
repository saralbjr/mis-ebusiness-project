import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34,34,34)',
  transform: 'translate(-50%, -50%) scale(0)',
  transition: 'transform 0.3s ease-in-out',
  zIndex: 1000,
  height: '90%',
  width: '90%',
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000,
};

export default function Modal({ children, onClose }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Open the modal with a delay to trigger the animation
    const timeoutId = setTimeout(() => {
      setIsOpen(true);
    }, 150);

    return () => clearTimeout(timeoutId);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    // Close the modal with a delay to allow the animation to complete
    setTimeout(onClose, 300);
  };

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={{ ...MODAL_STYLES, transform: `translate(-50%, -50%) scale(${isOpen ? 1 : 0})` }}>
        <button
          className='btn bg-danger fs-4'
          style={{ marginLeft: '90%', marginTop: '-35px' }}
          onClick={closeModal}
        >
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  );
}
