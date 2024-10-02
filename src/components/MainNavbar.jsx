import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/mainAssets/logo.png";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { BsCart4 } from "react-icons/bs";
import { IoMoon, IoMenu, IoClose } from "react-icons/io5";

const MainNavbar = () => {
  return (
    <div className="flex md:flex-row flex-col justify-between bg-white p-4">
      <div>
        <img src={logo} alt="Logo" className="py-5 md:p-0" />
      </div>
      <div className="lg:block hidden">
        <div className="flex gap-3 ">
          <Link
            to="/"
            className="hover:border-solid hover:border-red-800 hover:border-b-4"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="hover:border-solid hover:border-red-800 hover:border-b-4"
          >
            Shop
          </Link>
        </div>
      </div>
      <div className="flex gap-3">
        <Button className="bg-[#014026]">
          <BsCart4 />
        </Button>
        <Button className="bg-[#014026]">Login</Button>
        <Button className="bg-[#0F172A]">
          <IoMoon />
        </Button>
        <div className="lg:hidden block bg-[#757575]">
          <Menu>
            <MenuHandler>
              <Button>
                <IoMenu />
              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem>
                <Link to="/">Home</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/shop">Shop</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
