import React, { useEffect, useState } from "react";
import axios from "../services/api";

function ManagerList() {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    axios.get("/managers").then((response) => {
      setManagers(response.data); // Assuming the backend API returns a list of managers
    });
  }, []);

  return (
    <div>
      <h1>Managers</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Manager ID</th>
            <th>Name</th>
            <th>Nationality</th>
            <th>Age</th>
            <th>Experience (Years)</th>
            <th>Team ID</th>
          </tr>
        </thead>
        <tbody>
          {managers.map((manager) => (
            <tr key={manager.ManagerID}>
              <td>{manager.ManagerID}</td>
              <td>{manager.Name}</td>
              <td>{manager.Nationality}</td>
              <td>{manager.Age}</td>
              <td>{manager.ExperienceYears}</td>
              <td>{manager.TeamID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManagerList;
