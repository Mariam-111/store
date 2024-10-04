import React from "react";
import MainNavbar from "../components/MainNavbar";
import HeroHome1 from "../components/HeroHome1";
import MainFooter from "../components/MainFooter";

const Home = ({ allProducts, cartNum }) => {
  return (
    <div>
      <MainNavbar cartNum={cartNum} />
      <HeroHome1 allProducts={allProducts} />
      <MainFooter />
    </div>
  );
};

export default Home;
