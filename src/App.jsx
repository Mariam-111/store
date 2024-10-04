import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";

const App = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartNum, setCartNum] = useState(0);

  const getAllProducts = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_API}/products`,
    }).then((info) => {
      setAllProducts(info.data);
    });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const addToCart = (product) => {
    const existsInCart = cartItems.some((item) => item.id === product.id);
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (!existsInCart) {
      setCartItems((prevItems) => [...prevItems, { ...product, counter: 1 }]);
      setCartNum((prevNum) => prevNum + 1);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, counter: item.counter + 1 }
            : item
        )
      );
    }
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Home allProducts={allProducts} cartNum={cartNum} />}
        />
        <Route
          path="/shop"
          element={
            <Shop
              allProducts={allProducts}
              addToCart={addToCart}
              cartNum={cartNum}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              cartNum={cartNum}
              setCartItems={setCartItems}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
