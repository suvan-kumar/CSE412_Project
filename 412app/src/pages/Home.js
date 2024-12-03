import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1 style={{ fontSize: "2.5em", fontWeight: "bold" }}>Welcome to the CSE 412 App</h1>
      <p style={{ fontSize: "1.2em", marginTop: "10px" }}>
        By G75: Ethan Keyser, Suvan Kumar, Sri Ram Reddy Lankireddy, Waley Lin
      </p>
      <p style={{ fontSize: "1.2em", marginTop: "20px" }}>Click a button to get started:</p>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
        <Link to="/teams">
          <button style={{ padding: "10px 20px", fontSize: "1em" }}>View Teams</button>
        </Link>
        <Link to="/managers">
          <button style={{ padding: "10px 20px", fontSize: "1em" }}>View Managers</button>
        </Link>
        <Link to="/players">
          <button style={{ padding: "10px 20px", fontSize: "1em" }}>View Players</button>
        </Link>
        <Link to="/stats">
          <button style={{ padding: "10px 20px", fontSize: "1em" }}>View Stats</button>
        </Link>
        <Link to="/compare">
          <button style={{ padding: "10px 20px", fontSize: "1em" }}>Compare Players</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
