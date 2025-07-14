import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import UserLayout from "./Layouts/UserLayout";
import AdminLayout from "./Layouts/AdminLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/*" element={<UserLayout />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
