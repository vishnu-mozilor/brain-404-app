import React from "react";
import { NavLink } from "react-router-dom";
import "../../assets/css/Sidebar.css"; // Optional: Create a CSS file for styling
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import BookIcon from "@mui/icons-material/Book";
import logo from "../../assets/images/brain-404-logo.png"; // Import the logo

function Sidebar() {
  return (
    <div className="sidebar p-[3px] pt-0">
      <div className="logo-container">
        <img src={logo} alt="Brain-404 Logo" className="logo p-0" />
      </div>
      <ul className="sidebar-menu">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <HomeIcon />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tickets"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <InfoIcon />
            Tickets
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/knowledge-base"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <BookIcon />
            Knowledge Base
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
