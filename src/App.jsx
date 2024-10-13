import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

const App = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartNum, setCartNum] = useState(cartItems.length);
  const [isAddedLocal, setIsAddedLocal] = useState(false);
  const [users, setUsers] = useState([]);
  const [loggedFlag, setLoggedFlag] = useState(false);
  const [currentName, setName] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  const addedLocalCart = () => {
    if (cartItems.length != 0) {
      localStorage.it = JSON.stringify(cartItems);
    }
  };

  const getAllProducts = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_API}/products`,
    }).then((info) => {
      setAllProducts(info.data);
    });
  };

  const addToCart = (product) => {
    const existsInCart = cartItems.some((item) => item.id === product.id);
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    setIsAddedLocal(false);

    if (loggedFlag) {
      if (!existsInCart) {
        setCartItems((prevItems) => [...prevItems, { ...product, counter: 1 }]);
      } else {
        setCartItems((prevItems) =>
          prevItems.map((item, index) =>
            index === existingItemIndex
              ? { ...item, counter: item.counter + 1 }
              : item
          )
        );
      }
      setIsAddedLocal(true);
    } else {
      navigate("/login");
    }
  };

  const deleteProduct = (product) => {
    const deletedIndex = cartItems.findIndex((item) => item.id === product.id);
    setCartItems((prevItems) =>
      prevItems.filter((item, indx) => deletedIndex != indx)
    );
  };

  const getUsers = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_API}/users`,
    }).then((res) => {
      setUsers(res.data);
    });
  };

  const getCurrentUser = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_API}/users/${localStorage.gi}`,
    }).then((res) => {
      setCurrentUser(res.data);
      setName(res.data.username);
    });
  };

  const postUser = (d) => {
    axios({
      method: "post",
      url: `${import.meta.env.VITE_API}/users`,
      data: d,
    }).then((res) => {
      getUsers();
      navigate("/Login");
    });
  };

  useEffect(() => {
    getAllProducts();
    getUsers();
  }, []);

  useEffect(() => {
    addedLocalCart();
  }, [addToCart]);

  useEffect(() => {
    setCartNum(cartItems.length);
  }, [cartItems]);

  useEffect(() => {
    const savedCartItems = localStorage.it;
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
      setCartNum(cartItems.length);
    }
  }, []);

  useEffect(() => {
    loggedFlag ? getCurrentUser() : localStorage.gi && setLoggedFlag(true);
  }, [loggedFlag]);

  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={
            <UserLayout
              allProducts={allProducts}
              cartNum={cartNum}
              setCartNum={setCartNum}
              addToCart={addToCart}
              cartItems={cartItems}
              setCartItems={setCartItems}
              deleteProduct={deleteProduct}
              addedLocalCart={addedLocalCart}
              users={users}
              loggedFlag={loggedFlag}
              setLoggedFlag={setLoggedFlag}
              currentName={currentName}
              role={currentUser.role}
              postUser={postUser}
              
            />
          }
        />
        <Route
          path="/admin/*"
          element={currentUser.role === "admin" && <AdminLayout />}
        />
      </Routes>
    </div>
  );
};

export default App;
