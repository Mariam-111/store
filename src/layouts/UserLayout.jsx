import React from "react";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UserInfo from "../pages/UserInfo";
import Cart from "../pages/Cart";
import { Route, Routes } from "react-router-dom";
import MainNavbar from "../components/MainNavbar";
import MainFooter from "../components/MainFooter";

const UserLayout = ({
  allProducts,
  addToCart,
  cartNum,
  cartItems,
  setCartItems,
  deleteProduct,
  addedLocalCart,
  users,
  loggedFlag,
  setLoggedFlag,
  currentName,
  role,
  postUser,
}) => {
  return (
    <div>
      <MainNavbar
        loggedFlag={loggedFlag}
        setLoggedFlag={setLoggedFlag}
        currentName={currentName}
        role={role}
        cartNum={cartNum}
        setCartItems={setCartItems}
      />
      <Routes>
        <Route path="/" element={<Home allProducts={allProducts} />} />
        <Route
          path="/shop"
          element={<Shop allProducts={allProducts} addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              setCartItems={setCartItems}
              deleteProduct={deleteProduct}
              loggedFlag={loggedFlag}
              addedLocalCart={addedLocalCart}
            />
          }
        />
        <Route
          path="/Login"
          element={
            <Login
              users={users}
              loggedFlag={loggedFlag}
              setLoggedFlag={setLoggedFlag}
              role={role}
            />
          }
        />
        <Route
          path="/Signup"
          element={<Signup users={users} postUser={postUser} />}
        />
        <Route path="/UserInfo" element={<UserInfo />} />
      </Routes>
      <MainFooter />
    </div>
  );
};

export default UserLayout;
