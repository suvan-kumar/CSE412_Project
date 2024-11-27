import React, { useEffect, useState } from "react";
import axios from "../services/api";

function StatsList() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios.get("/stats").then((response) => {
      setStats(response.data); // Assuming the backend API returns a list of stats
    });
  }, []);

  return (
    <div>
      <h1>Player Stats</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Player ID</th>
            <th>Shots</th>
            <th>Goals</th>
            <th>Assists</th>
            <th>Yellow Cards</th>
            <th>Red Cards</th>
            <th>Saves</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat) => (
            <tr key={stat.StatID}>
              <td>{stat.PlayerID}</td>
              <td>{stat.Shots}</td>
              <td>{stat.Goals}</td>
              <td>{stat.Assists}</td>
              <td>{stat.YellowCards}</td>
              <td>{stat.RedCards}</td>
              <td>{stat.Saves}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StatsList;
