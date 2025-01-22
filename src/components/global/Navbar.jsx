import React from "react";
import "../../assets/css/Navbar.css";
import Button from "../common/Button";

function Navbar({ userName, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <span className="text-white">Welcome, {userName}</span>
        <Button onClick={onLogout} className="ml-4" text="Logout" />
      </div>
    </nav>
  );
}

export default Navbar;
