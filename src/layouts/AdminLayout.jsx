import React from "react";
import { Route, Routes } from "react-router-dom";
import AllUsers from "../pages/AllUsers";
import Dashboard from "../pages/Dashboard";
import NavbarDark from "../components/NavbarDark";
import ShowUser from "../pages/ShowUser";
import EditProduct from "../pages/EditProduct";
import AddProduct from "../pages/AddProduct";
import Productsinfo from "../pages/Productsinfo";

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
      <NavbarDark />
      {/* <Dashboard /> */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
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
        <Route path="/AllUsers/ShowUser" element={<ShowUser />} />
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
