import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../services/api";

function TeamList() {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // To store the search input

  // Fetch Teams from the database
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = () => {
    axios
      .get("/teams") // Fetch all teams
      .then((response) => setTeams(response.data))
      .catch((error) => console.error("Error fetching teams:", error));
  };

  // Filtered teams based on search term
  const filteredTeams = teams.filter((team) =>
    team.teamname.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {/* Search Team */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search for a team"
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

      {/* Display Teams */}
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
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
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team) => (
              <tr key={team.teamid}>
                <td>{team.teamid}</td>
                <td>{team.teamname}</td>
                <td>{team.country}</td>
                <td>{team.foundationyear}</td>
                <td>{team.totalwins}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No teams found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TeamList;
