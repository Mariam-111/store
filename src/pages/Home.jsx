import React from "react";
import MainNavbar from "../components/MainNavbar";
import HeroHome1 from "../components/HeroHome1";
import MainFooter from "../components/MainFooter";

const Home = ({ allProducts, cartNum }) => {
  return (
    <div>
      <HeroHome1 allProducts={allProducts} />
    </div>
  );
};

export default Home;
