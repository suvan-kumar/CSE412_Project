import React, { useEffect, useState } from "react";
import axios from "../services/api";

function TeamList() {
  const [teams, setTeams] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null); // To handle editing
  const [newTeam, setNewTeam] = useState({ TeamName: "", Country: "", FoundationYear: "", TotalWins: "" }); // New team

  // Fetch Teams from the database
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = () => {
    axios
      .get("/teams")
      .then((response) => setTeams(response.data))
      .catch((error) => console.error("Error fetching teams:", error));
  };

  // Handle Add New Team
  const handleAddTeam = () => {
    axios
      .post("/teams", newTeam)
      .then(() => {
        fetchTeams(); // Refresh the team list
        setNewTeam({ TeamName: "", Country: "", FoundationYear: "", TotalWins: "" }); // Reset form
      })
      .catch((error) => console.error("Error adding team:", error));
  };

  // Handle Delete Team
  const handleDeleteTeam = (teamId) => {
    axios
      .delete(`/teams/${teamId}`)
      .then(() => fetchTeams()) // Refresh the team list
      .catch((error) => console.error("Error deleting team:", error));
  };

  // Handle Edit Team
  const handleEditTeam = (teamId) => {
    axios
      .put(`/teams/${teamId}`, editingTeam)
      .then(() => {
        fetchTeams(); // Refresh the team list
        setEditingTeam(null); // Reset editing state
      })
      .catch((error) => console.error("Error updating team:", error));
  };

  return (
    <div>
      <h1>Teams</h1>

      {/* Add New Team */}
      <div>
        <h3>Add New Team</h3>
        <input
          type="text"
          placeholder="Team Name"
          value={newTeam.TeamName}
          onChange={(e) => setNewTeam({ ...newTeam, TeamName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Country"
          value={newTeam.Country}
          onChange={(e) => setNewTeam({ ...newTeam, Country: e.target.value })}
        />
        <input
          type="number"
          placeholder="Foundation Year"
          value={newTeam.FoundationYear}
          onChange={(e) => setNewTeam({ ...newTeam, FoundationYear: e.target.value })}
        />
        <input
          type="number"
          placeholder="Total Wins"
          value={newTeam.TotalWins}
          onChange={(e) => setNewTeam({ ...newTeam, TotalWins: e.target.value })}
        />
        <button onClick={handleAddTeam}>Add Team</button>
      </div>

      {/* Display Teams */}
      <table border="1">
        <thead>
          <tr>
            <th>Team ID</th>
            <th>Team Name</th>
            <th>Country</th>
            <th>Foundation Year</th>
            <th>Total Wins</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.TeamID}>
              <td>{team.TeamID}</td>
              <td>
                {editingTeam && editingTeam.TeamID === team.TeamID ? (
                  <input
                    type="text"
                    value={editingTeam.TeamName}
                    onChange={(e) => setEditingTeam({ ...editingTeam, TeamName: e.target.value })}
                  />
                ) : (
                  team.TeamName
                )}
              </td>
              <td>
                {editingTeam && editingTeam.TeamID === team.TeamID ? (
                  <input
                    type="text"
                    value={editingTeam.Country}
                    onChange={(e) => setEditingTeam({ ...editingTeam, Country: e.target.value })}
                  />
                ) : (
                  team.Country
                )}
              </td>
              <td>
                {editingTeam && editingTeam.TeamID === team.TeamID ? (
                  <input
                    type="number"
                    value={editingTeam.FoundationYear}
                    onChange={(e) => setEditingTeam({ ...editingTeam, FoundationYear: e.target.value })}
                  />
                ) : (
                  team.FoundationYear
                )}
              </td>
              <td>
                {editingTeam && editingTeam.TeamID === team.TeamID ? (
                  <input
                    type="number"
                    value={editingTeam.TotalWins}
                    onChange={(e) => setEditingTeam({ ...editingTeam, TotalWins: e.target.value })}
                  />
                ) : (
                  team.TotalWins
                )}
              </td>
              <td>
                {editingTeam && editingTeam.TeamID === team.TeamID ? (
                  <>
                    <button onClick={() => handleEditTeam(team.TeamID)}>Save</button>
                    <button onClick={() => setEditingTeam(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingTeam(team)}>Edit</button>
                    <button onClick={() => handleDeleteTeam(team.TeamID)}>Delete</button>
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

export default TeamList;
