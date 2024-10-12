import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AllUsers from "../pages/AllUsers";
import { Button } from "@material-tailwind/react";

const AdminLayout = () => {
  return (
    <div>
      admin layout
      <br />
      <Link to="AllUsers" className="bg-blue-800">
        View users
      </Link>
      {/* <Routes>
        <Route path="AllUsers" element={<AllUsers />} />
      </Routes> */}
    </div>
  );
};

export default AdminLayout;
