import React from "react";
import MainNavbar from "../components/MainNavbar";
import CartContent from "../components/CartContent";
import MainFooter from "../components/MainFooter";

const Cart = ({ cartItems, cartNum, setCartItems }) => {
  return (
    <div>
      <MainNavbar cartNum={cartNum} />
      <CartContent cartItems={cartItems} setCartItems={setCartItems} />
      <MainFooter />
    </div>
  );
};

export default Cart;
