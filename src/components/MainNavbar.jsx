import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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


const MainNavbar = ({ cartNum }) => {
  const navigate = useNavigate();
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
        <div className="relative inline-flex">
          <button
            className="bg-[#014026] dark:bg-[#0F172A] font-sans font-bold text-center px-6 rounded-lg text-white active:opacity-[0.85] py-2"
            type="button"
            onClick={() => navigate("/cart")}
          >
            <BsCart4 />
          </button>
          <span className="absolute rounded-full p-1 text-xs content-[''] grid place-items-center top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4  min-w-[24px] min-h-[24px] bg-red-400 text-white font-bold">
            {cartNum}
          </span>
        </div>
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
