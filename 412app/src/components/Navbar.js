import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul style={{ display: "flex", listStyleType: "none", gap: "10px", padding: "10px" }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/teams">Teams</Link>
        </li>
        <li>
          <Link to="/managers">Managers</Link>
        </li>
        <li>
          <Link to="/players">Players</Link>
        </li>
        <li>
          <Link to="/stats">Stats</Link>
        </li>
        <li>
          <Link to="/compare">Compare Players</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
