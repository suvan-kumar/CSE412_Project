import React, { useState, useEffect } from "react";
import axios from "../services/api";

function Compare() {
  const [players, setPlayers] = useState([]); // All players data
  const [player1, setPlayer1] = useState(null); // First selected player
  const [player2, setPlayer2] = useState(null); // Second selected player
  const [search1, setSearch1] = useState(""); // Search term for player 1
  const [search2, setSearch2] = useState(""); // Search term for player 2

  // Fetch players from the API
  useEffect(() => {
    axios.get("/players")
      .then((response) => setPlayers(response.data))
      .catch((error) => console.error("Error fetching players:", error));
  }, []);

  // Search players by name
  const filteredPlayers1 = players.filter((player) =>
    player.Name.toLowerCase().includes(search1.toLowerCase())
  );
  const filteredPlayers2 = players.filter((player) =>
    player.Name.toLowerCase().includes(search2.toLowerCase())
  );

  return (
    <div>
      <h1>Compare Players</h1>

      {/* Search and Select Player 1 */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Player 1</h3>
        <input
          type="text"
          placeholder="Search for a player"
          value={search1}
          onChange={(e) => setSearch1(e.target.value)}
        />
        <div>
          {filteredPlayers1.length > 0 ? (
            filteredPlayers1.map((player) => (
              <div key={player.PlayerID} style={{ cursor: "pointer" }}>
                <p onClick={() => setPlayer1(player)}>{player.Name}</p>
              </div>
            ))
          ) : (
            <p>No players found for this search term.</p>
          )}
        </div>
        {player1 && (
          <div style={{ border: "1px solid #ddd", padding: "10px", marginTop: "10px" }}>
            <h4>{player1.Name}</h4>
            <p><strong>Age:</strong> {player1.Age}</p>
            <p><strong>Position:</strong> {player1.Position}</p>
            <p><strong>Games Played:</strong> {player1.GamesPlayed}</p>
          </div>
        )}
      </div>

      {/* Search and Select Player 2 */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Player 2</h3>
        <input
          type="text"
          placeholder="Search for a player"
          value={search2}
          onChange={(e) => setSearch2(e.target.value)}
        />
        <div>
          {filteredPlayers2.length > 0 ? (
            filteredPlayers2.map((player) => (
              <div key={player.PlayerID} style={{ cursor: "pointer" }}>
                <p onClick={() => setPlayer2(player)}>{player.Name}</p>
              </div>
            ))
          ) : (
            <p>No players found for this search term.</p>
          )}
        </div>
        {player2 && (
          <div style={{ border: "1px solid #ddd", padding: "10px", marginTop: "10px" }}>
            <h4>{player2.Name}</h4>
            <p><strong>Age:</strong> {player2.Age}</p>
            <p><strong>Position:</strong> {player2.Position}</p>
            <p><strong>Games Played:</strong> {player2.GamesPlayed}</p>
          </div>
        )}
      </div>

      {/* Comparison */}
      {player1 && player2 && (
        <div style={{ border: "1px solid #000", padding: "20px", marginTop: "20px" }}>
          <h2>Comparison</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Stat</th>
                <th>{player1.Name}</th>
                <th>{player2.Name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Age</td>
                <td>{player1.Age}</td>
                <td>{player2.Age}</td>
              </tr>
              <tr>
                <td>Position</td>
                <td>{player1.Position}</td>
                <td>{player2.Position}</td>
              </tr>
              <tr>
                <td>Games Played</td>
                <td>{player1.GamesPlayed}</td>
                <td>{player2.GamesPlayed}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Compare;
