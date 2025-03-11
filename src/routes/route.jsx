import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Create from "../pages/Create.jsx";
import Navbar from "../components/Navbar.jsx";


const AllRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        {/* <Route path="/update/:id" element={<Create />} /> */}
      </Routes>
    </Router>
  );
};

export default AllRoutes;
