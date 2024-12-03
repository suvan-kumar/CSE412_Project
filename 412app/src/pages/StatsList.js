import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../services/api";

function StatsList() {
  const [stats, setStats] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // To filter stats by player name or ID

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

  // Filter stats based on search term (player name or ID)
  const filteredStats = stats.filter(
    (stat) =>
      stat.PlayerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stat.PlayerID.toString().includes(searchTerm)
  );

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

      {/* Search Stats */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by player name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
      </div>

      {/* Display Stats */}
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Stat ID</th>
            <th>Player ID</th>
            <th>Player Name</th>
            <th>Shots</th>
            <th>Goals</th>
            <th>Assists</th>
            <th>Red Cards</th>
            <th>Yellow Cards</th>
            <th>Saves</th>
          </tr>
        </thead>
        <tbody>
          {filteredStats.length > 0 ? (
            filteredStats.map((stat) => (
              <tr key={stat.StatID}>
                <td>{stat.StatID}</td>
                <td>{stat.PlayerID}</td>
                <td>{stat.PlayerName || "Unknown"}</td>
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
              <td colSpan="9" style={{ textAlign: "center" }}>
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
