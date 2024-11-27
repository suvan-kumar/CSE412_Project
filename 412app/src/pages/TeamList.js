import React, { useEffect, useState } from "react";
import axios from "../services/api";

function TeamList() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get("/teams").then((response) => {
      setTeams(response.data); // Assuming the backend API returns a list of teams
    });
  }, []);

  return (
    <div>
      <h1>Teams</h1>
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
          {teams.map((team) => (
            <tr key={team.TeamID}>
              <td>{team.TeamID}</td>
              <td>{team.TeamName}</td>
              <td>{team.Country}</td>
              <td>{team.FoundationYear}</td>
              <td>{team.TotalWins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeamList;
