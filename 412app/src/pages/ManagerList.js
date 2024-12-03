import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { Link } from "react-router-dom";

function ManagerList() {
  const [managers, setManagers] = useState([]);

  // Fetch Managers
  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = () => {
    axios
      .get("/managers")
      .then((response) => setManagers(response.data))
      .catch((error) => console.error("Error fetching managers:", error));
  };

  return (
    <div>
      <h1>Managers</h1>

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

      {/* Display Managers */}
      <table border="1">
        <thead>
          <tr>
            <th>Manager ID</th>
            <th>Name</th>
            <th>Nationality</th>
            <th>Age</th>
            <th>Experience Years</th>
            <th>Team ID</th>
          </tr>
        </thead>
        <tbody>
          {managers.length > 0 ? (
            managers.map((manager) => (
              <tr key={manager.ManagerID}>
                <td>{manager.ManagerID}</td>
                <td>{manager.Name}</td>
                <td>{manager.Nationality}</td>
                <td>{manager.Age}</td>
                <td>{manager.ExperienceYears}</td>
                <td>{manager.TeamID}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No managers available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManagerList;
