import React from 'react';
import { Typography } from '@mui/material';

const Cart = (props) => {
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0);

  return (
    <div>
      <Typography variant="h6" component="span" style={{ marginLeft: 8 }}>
        Cart Count : {cartQuantity ? cartQuantity : 'Cart is empty'} 
      </Typography>
    </div>
  );
};

export default Cart;
