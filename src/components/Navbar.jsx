import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="flex items-center justify-center md:w-[50vw] w-[80vw] mb-4 mt-2 mx-auto gap-2 border border-blue-400 p-0.5 rounded-xl">
            <NavLink to="/" className={({ isActive }) => `w-1/2 text-center p-2 rounded-lg ${isActive ? "bg-blue-600 text-white" : ""}`}>
                Home
            </NavLink>
            <NavLink to="/create" className={({ isActive }) => `w-1/2 text-center p-2 rounded-lg ${isActive ? "bg-blue-600 text-white" : ""}`}>
                Create Form
            </NavLink>
        </div>
    );
};

export default Navbar;
