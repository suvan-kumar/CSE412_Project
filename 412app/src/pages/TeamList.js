import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../services/api";

function TeamList() {
  const [teams, setTeams] = useState([]);

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

  return (
    <div>
      <h1>Teams</h1>

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

      {/* Display Teams */}
      <table border="1">
        <thead>
          <tr>
            <th>Team ID</th>
            <th>Team Name</th>
            <th>Country</th>
            <th>Foundation Year</th>
            <th>Total Wins</th>
          </tr>
        </thead>
        <tbody>
          {teams.length > 0 ? (
            teams.map((team) => (
              <tr key={team.TeamID}>
                <td>{team.TeamID}</td>
                <td>{team.TeamName}</td>
                <td>{team.Country}</td>
                <td>{team.FoundationYear}</td>
                <td>{team.TotalWins}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No teams available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TeamList;
