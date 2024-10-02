import React from "react";
import MainNavbar from "../components/MainNavbar";
import HeroHome1 from "../components/HeroHome1";
import MainFooter from "../components/MainFooter";

const Home = ({ allProducts }) => {
  return (
    <div>
      <MainNavbar />
      <HeroHome1 allProducts={allProducts} />
      <MainFooter />
    </div>
  );
};

export default Home;
