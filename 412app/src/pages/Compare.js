import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../services/api";

function Compare() {
  const [players, setPlayers] = useState([]); 
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("/players")
      .then((response) => setPlayers(response.data))
      .catch((error) => console.error("Error fetching players:", error));
  }, []);

  const filteredPlayers = players.filter((player) =>
    player.Name.toLowerCase().includes(search.toLowerCase())
  );

  const togglePlayerSelection = (player) => {
    if (selectedPlayers.includes(player)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p !== player));
    } else if (selectedPlayers.length < 4) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  return (
    <div>
      <h1>Compare Players</h1>

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

      {/* Search Players */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search for players"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
      </div>

      {/* Player Selection */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {filteredPlayers.map((player) => (
          <div
            key={player.PlayerID}
            onClick={() => togglePlayerSelection(player)}
            style={{
              padding: "10px",
              border: "1px solid #007bff",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: selectedPlayers.includes(player)
                ? "#007bff"
                : "white",
              color: selectedPlayers.includes(player) ? "white" : "black",
            }}
          >
            {player.Name}
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      {selectedPlayers.length > 1 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Comparison</h2>
          <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Stat</th>
                {selectedPlayers.map((player) => (
                  <th key={player.PlayerID}>{player.Name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Games Played</td>
                {selectedPlayers.map((player) => (
                  <td key={player.PlayerID}>{player.GamesPlayed}</td>
                ))}
              </tr>
              <tr>
                <td>Wins</td>
                {selectedPlayers.map((player) => (
                  <td key={player.PlayerID}>{player.Wins}</td>
                ))}
              </tr>
              <tr>
                <td>Total Trophies</td>
                {selectedPlayers.map((player) => (
                  <td key={player.PlayerID}>{player.Trophies}</td>
                ))}
              </tr>
              <tr>
                <td>Team Affiliation</td>
                {selectedPlayers.map((player) => (
                  <td key={player.PlayerID}>{player.TeamName}</td>
                ))}
              </tr>
              <tr>
                <td>Average Score/Game</td>
                {selectedPlayers.map((player) => (
                  <td key={player.PlayerID}>
                    {(
                      player.TotalScore / player.GamesPlayed || 0
                    ).toFixed(2)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {selectedPlayers.length === 0 && (
        <p style={{ marginTop: "20px", textAlign: "center" }}>
          Select at least two players to compare.
        </p>
      )}
    </div>
  );
}

export default Compare;
