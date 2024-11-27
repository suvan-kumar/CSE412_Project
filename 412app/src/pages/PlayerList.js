import React, { useEffect, useState } from "react";
import axios from "../services/api";

function PlayerList() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get("/players").then((response) => {
      setPlayers(response.data); // Assuming the backend API returns a list of players
    });
  }, []);

  return (
    <div>
      <h1>Players</h1>
      <table border="1">
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
          {players.map((player) => (
            <tr key={player.PlayerID}>
              <td>{player.PlayerID}</td>
              <td>{player.Name}</td>
              <td>{player.Age}</td>
              <td>{player.Position}</td>
              <td>{player.Nationality}</td>
              <td>{player.GamesPlayed}</td>
              <td>{player.TeamID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerList;
