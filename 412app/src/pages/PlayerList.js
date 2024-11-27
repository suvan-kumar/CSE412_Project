import React, { useEffect, useState } from "react";
import axios from "../services/api";

function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [newPlayer, setNewPlayer] = useState({
    Name: "",
    Age: "",
    Position: "",
    Nationality: "",
    GamesPlayed: 0,
    TeamID: "",
  });

  // Fetch Players
  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = () => {
    axios.get("/players")
      .then((response) => setPlayers(response.data))
      .catch((error) => console.error("Error fetching players:", error));
  };

  // Add Player
  const handleAddPlayer = () => {
    axios.post("/players", newPlayer)
      .then(() => {
        fetchPlayers();
        setNewPlayer({ Name: "", Age: "", Position: "", Nationality: "", GamesPlayed: 0, TeamID: "" });
      })
      .catch((error) => console.error("Error adding player:", error));
  };

  // Delete Player
  const handleDeletePlayer = (playerId) => {
    axios.delete(`/players/${playerId}`)
      .then(() => fetchPlayers())
      .catch((error) => console.error("Error deleting player:", error));
  };

  // Edit Player
  const handleEditPlayer = (playerId) => {
    axios.put(`/players/${playerId}`, editingPlayer)
      .then(() => {
        fetchPlayers();
        setEditingPlayer(null);
      })
      .catch((error) => console.error("Error updating player:", error));
  };

  return (
    <div>
      <h1>Players</h1>

      {/* Add New Player */}
      <div>
        <h3>Add New Player</h3>
        <input type="text" placeholder="Name" value={newPlayer.Name} onChange={(e) => setNewPlayer({ ...newPlayer, Name: e.target.value })} />
        <input type="number" placeholder="Age" value={newPlayer.Age} onChange={(e) => setNewPlayer({ ...newPlayer, Age: e.target.value })} />
        <input type="text" placeholder="Position" value={newPlayer.Position} onChange={(e) => setNewPlayer({ ...newPlayer, Position: e.target.value })} />
        <input type="text" placeholder="Nationality" value={newPlayer.Nationality} onChange={(e) => setNewPlayer({ ...newPlayer, Nationality: e.target.value })} />
        <input type="number" placeholder="Games Played" value={newPlayer.GamesPlayed} onChange={(e) => setNewPlayer({ ...newPlayer, GamesPlayed: e.target.value })} />
        <input type="number" placeholder="Team ID" value={newPlayer.TeamID} onChange={(e) => setNewPlayer({ ...newPlayer, TeamID: e.target.value })} />
        <button onClick={handleAddPlayer}>Add Player</button>
      </div>

      {/* Display Players */}
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.PlayerID}>
              <td>{player.PlayerID}</td>
              <td>
                {editingPlayer && editingPlayer.PlayerID === player.PlayerID ? (
                  <input type="text" value={editingPlayer.Name} onChange={(e) => setEditingPlayer({ ...editingPlayer, Name: e.target.value })} />
                ) : (
                  player.Name
                )}
              </td>
              <td>
                {editingPlayer && editingPlayer.PlayerID === player.PlayerID ? (
                  <input type="number" value={editingPlayer.Age} onChange={(e) => setEditingPlayer({ ...editingPlayer, Age: e.target.value })} />
                ) : (
                  player.Age
                )}
              </td>
              <td>
                {editingPlayer && editingPlayer.PlayerID === player.PlayerID ? (
                  <input type="text" value={editingPlayer.Position} onChange={(e) => setEditingPlayer({ ...editingPlayer, Position: e.target.value })} />
                ) : (
                  player.Position
                )}
              </td>
              <td>
                {editingPlayer && editingPlayer.PlayerID === player.PlayerID ? (
                  <input type="text" value={editingPlayer.Nationality} onChange={(e) => setEditingPlayer({ ...editingPlayer, Nationality: e.target.value })} />
                ) : (
                  player.Nationality
                )}
              </td>
              <td>
                {editingPlayer && editingPlayer.PlayerID === player.PlayerID ? (
                  <input type="number" value={editingPlayer.GamesPlayed} onChange={(e) => setEditingPlayer({ ...editingPlayer, GamesPlayed: e.target.value })} />
                ) : (
                  player.GamesPlayed
                )}
              </td>
              <td>
                {editingPlayer && editingPlayer.PlayerID === player.PlayerID ? (
                  <input type="number" value={editingPlayer.TeamID} onChange={(e) => setEditingPlayer({ ...editingPlayer, TeamID: e.target.value })} />
                ) : (
                  player.TeamID
                )}
              </td>
              <td>
                {editingPlayer && editingPlayer.PlayerID === player.PlayerID ? (
                  <>
                    <button onClick={() => handleEditPlayer(player.PlayerID)}>Save</button>
                    <button onClick={() => setEditingPlayer(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingPlayer(player)}>Edit</button>
                    <button onClick={() => handleDeletePlayer(player.PlayerID)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerList;
