import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
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

const MainNavbar = ({ loggedFlag, setLoggedFlag, currentName,role }) => {
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
        <Link to="/Login" className={`${loggedFlag ? "hidden" : "block"}`}>
          <Button className="bg-[#014026]">Login</Button>
        </Link>

        <div
          className={`${loggedFlag ? "block dropdown dropdown-end" : "hidden"}`}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/UserInfo" onClick={()=> Navigate("/UserInfo")} className="justify-between">{`Welcome ${currentName}`}</Link>
            </li>
            <li>
              <Link to="/Dashboard" className="justify-between" onClick={()=> Navigate("/Dashboard")}>Dashboard</Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  localStorage.clear();
                  setLoggedFlag(false);
                }}
              >
                Signout
              </Link>
            </li>
          </ul>
        </div>

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
