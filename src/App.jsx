import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import AllUsers from "./pages/AllUsers";

const App = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartNum, setCartNum] = useState(0);

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
  const [currentName, setName] = useState("");

  const [currentUser, setCurrentUser] = useState({});
  const getCurrentUser = () => {
    axios({
      method: "get",
      url: `http://localhost:3000/users/${localStorage.gi}`,
    }).then((res) => {
      setCurrentUser(res.data);
      setName(res.data.username);
    });
  };
  useEffect(() => {
    loggedFlag ? getCurrentUser() : localStorage.gi && setLoggedFlag(true);
  }, [loggedFlag]);

  const postUser = (d) => {
    axios({
      method: "post",
      url: "http://localhost:3000/users",
      data: d,
    }).then((res) => {
      getUsers();
      navigate("/Login");
    });
  };
  const makeAdmin = (id) =>{
      let newUsers = users.map((u) => {
        if(u.id == id){ u.role = "admin"; console.log("done")};
        return u;
      });
      setUsers(newUsers);
      axios({
        method: "patch",
        url: "http://localhost:3000/users",
        data: users,
      }).then((res)=>console.log(res.data))
  }

  const addToCart = (product) => {
    const existsInCart = cartItems.some((item) => item.id === product.id);
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (!existsInCart) {
      setCartItems((prevItems) => [...prevItems, { ...product, counter: 1 }]);
      setCartNum((prevNum) => prevNum + 1);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, counter: item.counter + 1 }
            : item
        )
      );
    }
  };

  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={
            <UserLayout
              allProducts={allProducts}
              cartNum={cartNum}
              addToCart={addToCart}
              cartItems={cartItems}
              setCartItems={setCartItems}
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
          element={<AdminLayout />}
          // element={currentUser.role === "admin" ? <AdminLayout /> : <Navigate to="/"/>}
        />
        <Route path="/admin/AllUsers" element={<AllUsers users={users} makeAdmin={makeAdmin} />}/>
      </Routes>
    </div>
  );
};

export default App;
