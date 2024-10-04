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
import { IoMoon, IoSunny, IoMenu, IoClose } from "react-icons/io5";

const MainNavbar = () => {

  const [mode, setMode] = useState("light");

  const setDark = () => {

    localStorage.theme = mode;
    setMode("dark");
    
  }
  const setLight = () => {
    
    localStorage.theme = mode;
    setMode("light");

  }

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    };
  }, [mode]);


  return (
    <div className="flex md:flex-row flex-col justify-between bg-white dark:bg-[#4a4a4a] p-4">
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
        <Button className="bg-[#014026] dark:bg-[#0F172A]">
          <BsCart4 />
        </Button>
        <Button className="bg-[#014026] dark:bg-[#0F172A]">Login</Button>
        <Button className="bg-[#014026] dark:bg-[#0F172A]"
          onClick={mode === "light" ? setDark : setLight}
        >
          {
            mode == "light" ? (
              <IoMoon onClick={setDark}/>
            ) : (
              <IoSunny onClick={setLight}/>
            )
         }
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
