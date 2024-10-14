import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import Swal from "sweetalert2";

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
  const [newUser, setnewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    role: "user",
  });
  const { username, email, password, role, gender } = newUser;
  const userData = { username, email, password, role, gender };
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);

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
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!newUser.username) {
      newErrors.username = "Username is required.";
    }
    if (!newUser.email) {
      newErrors.email = "Email is required.";
    }
    if (!newUser.password) {
      newErrors.password = "Password is required.";
    }
    if (!newUser.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    }
    if (!newUser.gender) {
      newErrors.gender = "Gender is required.";
    }

    const checkUser = users.find(({ email }) => email === newUser.email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (checkUser) {
      newErrors.email = "Email is already exist";
    }
    if (newUser.email && !emailRegex.test(newUser.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (newUser.password && newUser.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    if (
      newUser.password &&
      newUser.confirmPassword &&
      newUser.password !== newUser.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const patchRole = (newRole, id) => {
    let newUsers = users.map((u) => {
      if (u.id == id) {
        u.role = newRole;
      }
      return u;
    });
    setUsers(newUsers);
    axios({
      method: "patch",
      url: `${import.meta.env.VITE_API}/users/${id}`,
      data: {
        role: newRole,
      },
    });
  };
  const makeAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Changing the role will affect the user permissions!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00d084",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make it!",
    }).then((result) => {
      if (result.isConfirmed) {
        patchRole("admin", id);
        Swal.fire({
          title: "Done!",
          text: "The role has been updated.",
          icon: "success",
        });
      }
    });
  };
  const makeUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Changing the role will affect the user permissions!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00d084",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make it!",
    }).then((result) => {
      if (result.isConfirmed) {
        patchRole("user", id);
        Swal.fire({
          title: "Done!",
          text: "The role has been updated.",
          icon: "success",
        });
      }
    });
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "DELETE",
          url: `${import.meta.env.VITE_API}/users/${id}`,
        }).then(() => getUsers());
        Swal.fire({
          title: "Deleted!",
          text: "This user has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const addUser = () => {
    setShowForm(true);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
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
              newUser={newUser}
              setnewUser={setnewUser}
              userData={userData}
              errors={errors}
              setErrors={setErrors}
              validate={validate}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/admin/*"
          element={
            <AdminLayout
              users={users}
              makeAdmin={makeAdmin}
              makeUser={makeUser}
              deleteUser={deleteUser}
              addUser={addUser}
              showForm={showForm}
              setShowForm={setShowForm}
              postUser={postUser}
              newUser={newUser}
              setnewUser={setnewUser}
              userData={userData}
              errors={errors}
              setErrors={setErrors}
              validate={validate}
            />
          }
          // element={currentUser.role === "admin" ? <AdminLayout /> : <Navigate to="/"/>}
        />
      </Routes>
    </div>
  );
};

export default App;
