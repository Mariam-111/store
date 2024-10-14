import React from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import UsersDashboard from "../pages/UsersDashboard";
import { Button } from "@material-tailwind/react";
import EditUser from "../pages/EditUser";
import AddUser from "../pages/AddUser";
import Dashboard from "../pages/Dashboard";

const AdminLayout = () => {
  return (
    <div>
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
    </div>
  );
};

export default AdminLayout;
