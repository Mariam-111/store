import React from "react";
import MainNavbar from "../components/MainNavbar";
import CartContent from "../components/CartContent";
import MainFooter from "../components/MainFooter";

const Cart = ({ cartItems, cartNum, setCartItems }) => {
  return (
    <div>
      <CartContent cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  );
};

export default Cart;
