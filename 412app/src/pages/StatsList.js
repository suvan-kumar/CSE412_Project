import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../services/api";

function StatsList() {
  const [stats, setStats] = useState([]);

  // Fetch Stats
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = () => {
    axios
      .get("/stats")
      .then((response) => setStats(response.data))
      .catch((error) => console.error("Error fetching stats:", error));
  };

  return (
    <div>
      <h1>Player Stats</h1>

      {/* Back to Home Button */}
      <Link to="/">
        <button
          style={{
            marginBottom: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Back to Home
        </button>
      </Link>

      {/* Display Stats */}
      <table border="1">
        <thead>
          <tr>
            <th>Stat ID</th>
            <th>Player ID</th>
            <th>Shots</th>
            <th>Goals</th>
            <th>Assists</th>
            <th>Red Cards</th>
            <th>Yellow Cards</th>
            <th>Saves</th>
          </tr>
        </thead>
        <tbody>
          {stats.length > 0 ? (
            stats.map((stat) => (
              <tr key={stat.StatID}>
                <td>{stat.StatID}</td>
                <td>{stat.PlayerID}</td>
                <td>{stat.Shots}</td>
                <td>{stat.Goals}</td>
                <td>{stat.Assists}</td>
                <td>{stat.RedCards}</td>
                <td>{stat.YellowCards}</td>
                <td>{stat.Saves}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No stats available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StatsList;
