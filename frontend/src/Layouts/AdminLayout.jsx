import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Admin from "../admin/Admin";
import AdminLogin from "../admin/AdminLogin";

const AdminLayout = () => {



  return (
    <div className="">
      {/* You can add an AdminNavbar here */}
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={ <Admin /> } />


        {/* <Route path="users" element={<AdminUsers />} /> */}
        {/* Add more admin routes */}
      </Routes>
    </div>
  );
};

export default AdminLayout;
