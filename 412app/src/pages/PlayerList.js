import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { Link } from "react-router-dom";

function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // To store the search input

  // Fetch Players
  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = () => {
    axios
      .get("/players")
      .then((response) => setPlayers(response.data))
      .catch((error) => console.error("Error fetching players:", error));
  };

  // Filter players based on the search term
  const filteredPlayers = players.filter((player) =>
    player.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Players</h1>

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

      {/* Search Player */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search for a player"
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

      {/* Display Players */}
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Player ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Position</th>
            <th>Nationality</th>
            <th>Games Played</th>
            <th>Team ID</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player) => (
              <tr key={player.PlayerID}>
                <td>{player.PlayerID}</td>
                <td>{player.Name}</td>
                <td>{player.Age}</td>
                <td>{player.Position}</td>
                <td>{player.Nationality}</td>
                <td>{player.GamesPlayed}</td>
                <td>{player.TeamID}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No players found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerList;
