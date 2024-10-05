import React from "react";
import CartContent from "../components/CartContent";

const Cart = ({ cartItems, setCartItems, deleteProduct }) => {
  return (
    <div>
      <CartContent
        cartItems={cartItems}
        setCartItems={setCartItems}
        deleteProduct={deleteProduct}
      />
    </div>
  );
};

export default Cart;
