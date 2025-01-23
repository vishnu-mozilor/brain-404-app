import React from "react";
import "../../assets/css/Navbar.css";
import Button from "../common/Button";
import ToggleSwitch from "../common/ToggleSwitch";

function Navbar({ userName, onLogout }) {
  const handleToggle = (isToggled) => {
    const res = fetch(
      "https://elyotmkzieihocmhryim.supabase.co/functions/v1/set-settings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          field: "auto_pilot",
          value: isToggled ? 1 : 0,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <nav className="navbar">
      <div
        className="navbar-content"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="mr-12">
          <ToggleSwitch label="Auto pilot mode" onToggle={handleToggle} />
        </div>
        <span className="text-white">Welcome, {userName}</span>
        {/* Hidden as the login/logout is not implemented */}
        {/* <Button onClick={onLogout} className="ml-4" text="Logout" /> */}
      </div>
    </nav>
  );
}

export default Navbar;
