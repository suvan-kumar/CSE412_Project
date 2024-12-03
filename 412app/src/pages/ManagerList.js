import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { Link } from "react-router-dom";

function ManagerList() {
  const [managers, setManagers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to store search input

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

  // Filter managers based on the search term
  const filteredManagers = managers.filter((manager) =>
    manager.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {/* Search Managers */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search for a manager"
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

      {/* Display Managers */}
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
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
          {filteredManagers.length > 0 ? (
            filteredManagers.map((manager) => (
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
                No managers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManagerList;
