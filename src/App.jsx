import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UserInfo from "./pages/UserInfo";

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

  const [users, setUsers] = useState([]);
  const getUsers = () => {
    axios({
      method: "get",
      url: `http://localhost:3000/users`,
    }).then((res) => {
      setUsers(res.data);
    });
  };
  useEffect(() => {
    getUsers();
  }, []);

  const [loggedFlag, setLoggedFlag] = useState(false);

  const [currentUser , setCurrentUser] = useState({});
  const getCurrentUser = () => {
    axios({
      method: "get",
      url: `http://localhost:3000/users/${localStorage.gi}`,
    }).then((res) => {
      setCurrentUser(res.data);
    });
  }
  useEffect(() =>{
    loggedFlag ? getCurrentUser() : localStorage.gi && setLoggedFlag(true);
  }, [loggedFlag]);
  
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home allProducts={allProducts} />} />
        <Route path="/shop" element={<Shop />} />
        <Route
          path="/Login"
          element={<Login users={users} loggedFlag={loggedFlag} setLoggedFlag={setLoggedFlag} role={currentUser.role} />}
        />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/UserInfo" element={<UserInfo/>} />
      </Routes>
    </div>
  );
};

export default App;
