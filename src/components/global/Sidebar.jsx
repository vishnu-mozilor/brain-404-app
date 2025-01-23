import React from "react";
import { NavLink } from "react-router-dom";
import "../../assets/css/Sidebar.css"; // Optional: Create a CSS file for styling
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import BookIcon from "@mui/icons-material/Book";
import logo from "../../assets/images/brain-404-logo.png"; // Import the logo

function Sidebar() {
  return (
    <div className="sidebar bg-white w-64 h-screen p-4">
      <div className="logo-container mb-8">
        <img src={logo} alt="Brain-404 Logo" className="w-32 mx-auto" />
      </div>
      <ul className="sidebar-menu space-y-2">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 ${
                isActive ? 'bg-blue-50 text-blue-600' : ''
              }`
            }
          >
            <HomeIcon className="text-xl" />
            <span className="whitespace-nowrap">Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tickets"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 ${
                isActive ? 'bg-blue-50 text-blue-600' : ''
              }`
            }
          >
            <InfoIcon className="text-xl" />
            <span className="whitespace-nowrap">Tickets</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/knowledge-base"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 ${
                isActive ? 'bg-blue-50 text-blue-600' : ''
              }`
            }
          >
            <BookIcon className="text-xl" />
            <span className="whitespace-nowrap">Knowledge Base</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
