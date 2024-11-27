import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // For navigation
import axios from "../services/api";

function StatsList() {
  const [stats, setStats] = useState([]);
  const [editingStat, setEditingStat] = useState(null);
  const [newStat, setNewStat] = useState({
    PlayerID: "",
    Shots: 0,
    Goals: 0,
    Assists: 0,
    RedCards: 0,
    YellowCards: 0,
    Saves: 0,
  });

  // Fetch Stats
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = () => {
    axios.get("/stats")
      .then((response) => setStats(response.data))
      .catch((error) => console.error("Error fetching stats:", error));
  };

  // Add Stat
  const handleAddStat = () => {
    axios.post("/stats", newStat)
      .then(() => {
        fetchStats();
        setNewStat({ PlayerID: "", Shots: 0, Goals: 0, Assists: 0, RedCards: 0, YellowCards: 0, Saves: 0 });
      })
      .catch((error) => console.error("Error adding stat:", error));
  };

  // Delete Stat
  const handleDeleteStat = (statId) => {
    axios.delete(`/stats/${statId}`)
      .then(() => fetchStats())
      .catch((error) => console.error("Error deleting stat:", error));
  };

  // Edit Stat
  const handleEditStat = (statId) => {
    axios.put(`/stats/${statId}`, editingStat)
      .then(() => {
        fetchStats();
        setEditingStat(null);
      })
      .catch((error) => console.error("Error updating stat:", error));
  };

  return (
    <div>
      <h1>Player Stats</h1>

      {/* Back to Home Button */}
      <Link to="/">
        <button style={{ marginBottom: "20px", padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
          Back to Home
        </button>
      </Link>

      {/* Add New Stat */}
      <div>
        <h3>Add New Stat</h3>
        <input type="number" placeholder="Player ID" value={newStat.PlayerID} onChange={(e) => setNewStat({ ...newStat, PlayerID: e.target.value })} />
        <input type="number" placeholder="Shots" value={newStat.Shots} onChange={(e) => setNewStat({ ...newStat, Shots: e.target.value })} />
        <input type="number" placeholder="Goals" value={newStat.Goals} onChange={(e) => setNewStat({ ...newStat, Goals: e.target.value })} />
        <input type="number" placeholder="Assists" value={newStat.Assists} onChange={(e) => setNewStat({ ...newStat, Assists: e.target.value })} />
        <input type="number" placeholder="Red Cards" value={newStat.RedCards} onChange={(e) => setNewStat({ ...newStat, RedCards: e.target.value })} />
        <input type="number" placeholder="Yellow Cards" value={newStat.YellowCards} onChange={(e) => setNewStat({ ...newStat, YellowCards: e.target.value })} />
        <input type="number" placeholder="Saves" value={newStat.Saves} onChange={(e) => setNewStat({ ...newStat, Saves: e.target.value })} />
        <button onClick={handleAddStat}>Add Stat</button>
      </div>

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat) => (
            <tr key={stat.StatID}>
              <td>{stat.StatID}</td>
              <td>
                {editingStat && editingStat.StatID === stat.StatID ? (
                  <input type="number" value={editingStat.PlayerID} onChange={(e) => setEditingStat({ ...editingStat, PlayerID: e.target.value })} />
                ) : (
                  stat.PlayerID
                )}
              </td>
              <td>
                {editingStat && editingStat.StatID === stat.StatID ? (
                  <input type="number" value={editingStat.Shots} onChange={(e) => setEditingStat({ ...editingStat, Shots: e.target.value })} />
                ) : (
                  stat.Shots
                )}
              </td>
              <td>
                {editingStat && editingStat.StatID === stat.StatID ? (
                  <input type="number" value={editingStat.Goals} onChange={(e) => setEditingStat({ ...editingStat, Goals: e.target.value })} />
                ) : (
                  stat.Goals
                )}
              </td>
              <td>
                {editingStat && editingStat.StatID === stat.StatID ? (
                  <input type="number" value={editingStat.Assists} onChange={(e) => setEditingStat({ ...editingStat, Assists: e.target.value })} />
                ) : (
                  stat.Assists
                )}
              </td>
              <td>
                {editingStat && editingStat.StatID === stat.StatID ? (
                  <input type="number" value={editingStat.RedCards} onChange={(e) => setEditingStat({ ...editingStat, RedCards: e.target.value })} />
                ) : (
                  stat.RedCards
                )}
              </td>
              <td>
                {editingStat && editingStat.StatID === stat.StatID ? (
                  <input type="number" value={editingStat.YellowCards} onChange={(e) => setEditingStat({ ...editingStat, YellowCards: e.target.value })} />
                ) : (
                  stat.YellowCards
                )}
              </td>
              <td>
                {editingStat && editingStat.StatID === stat.StatID ? (
                  <input type="number" value={editingStat.Saves} onChange={(e) => setEditingStat({ ...editingStat, Saves: e.target.value })} />
                ) : (
                  stat.Saves
                )}
              </td>
              <td>
                {editingStat && editingStat.StatID === stat.StatID ? (
                  <>
                    <button onClick={() => handleEditStat(stat.StatID)}>Save</button>
                    <button onClick={() => setEditingStat(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingStat(stat)}>Edit</button>
                    <button onClick={() => handleDeleteStat(stat.StatID)}>Delete</button>
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

export default StatsList;
