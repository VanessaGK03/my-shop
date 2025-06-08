import React from 'react';
import '../styles/CartPopup.css';


const CartPopup = ({ imageUrl, visible }) => {
  return (
    <div className={`cart-popup ${visible ? 'show' : ''}`}>
      <img src={imageUrl} alt="Added to cart" />
      <p>Added to cart!</p>
    </div>
  );
};

export default CartPopup;
