import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";

const App = () => {
  const [allProducts, setAllProducts] = useState([]);

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

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home allProducts={allProducts} />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </div>
  );
};

export default App;
