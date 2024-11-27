import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul style={{ display: "flex", gap: "10px", listStyle: "none" }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/teams">Teams</Link></li>
        <li><Link to="/managers">Managers</Link></li>
        <li><Link to="/players">Players</Link></li>
        <li><Link to="/stats">Stats</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
