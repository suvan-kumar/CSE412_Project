import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to the 412App</h1>
      <p>Choose a section to explore:</p>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Link to="/teams">
          <button style={{ padding: "10px 20px" }}>View Teams</button>
        </Link>
        <Link to="/managers">
          <button style={{ padding: "10px 20px" }}>View Managers</button>
        </Link>
        <Link to="/players">
          <button style={{ padding: "10px 20px" }}>View Players</button>
        </Link>
        <Link to="/stats">
          <button style={{ padding: "10px 20px" }}>View Stats</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
