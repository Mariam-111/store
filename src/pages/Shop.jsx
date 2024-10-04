import React from "react";
import MainNavbar from "../components/MainNavbar";
import MainFooter from "../components/MainFooter";
import ShopContent from "../components/ShopContent";

const Shop = ({ allProducts, addToCart, cartNum }) => {
  return (
    <div>
      <ShopContent allProducts={allProducts} addToCart={addToCart} />
    </div>
  );
};

export default Shop;
