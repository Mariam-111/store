import React from "react";
import UsersDashboard from "../pages/UsersDashboard";
import { Route, Routes, useNavigate } from "react-router-dom";

import AllUsers from "../pages/AllUsers";
import Dashboard from "../pages/Dashboard";
import NavbarDark from "../components/NavbarDark";
import EditProduct from "../pages/EditProduct";
import AddProduct from "../pages/AddProduct";
import Productsinfo from "../pages/Productsinfo";
import ShowUser from "../pages/ShowUser";

const AdminLayout = ({
  users,
  makeAdmin,
  makeUser,
  deleteUser,
  addUser,
  showForm,
  setShowForm,
  postUser,
  newUser,
  setnewUser,
  userData,
  errors,
  setErrors,
  validate,
}) => {
  return (
    <div>
{/* <<<<<<< HEAD
      admin layout
      <br />
      <Link to="UsersDashboard" className="bg-blue-800">
        Users Dashboard
      </Link>
      <br />
      {/* <Link to="AddUser" className="bg-blue-800">
        add Users 
      </Link>
      <Routes>
      <Route path="/AddUser" element={<AddUser/>} />
      </Routes> */}
      <NavbarDark />
      {/* <Dashboard /> */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route
          path="/AllUsers"
          element={
            <AllUsers
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
        />
        <Route path="/AllUsers/ShowUser" element={<ShowUser />} /> */}
        <Route path="/Productsinfo" element={<Productsinfo />} />
        <Route path="/Productsinfo/addProduct" element={<AddProduct />} />
        <Route
          path="/admin/Productsinfo/editProduct"
          element={<EditProduct />}
        />
      </Routes>
    </div>
  );
};

export default AdminLayout;
