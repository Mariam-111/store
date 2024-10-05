import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const AdminLayout = () => {
  return (
    <div>
      admin layout
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default AdminLayout;
