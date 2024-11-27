import React, { useEffect, useState } from "react";
import axios from "../services/api";

function ManagerList() {
  const [managers, setManagers] = useState([]);
  const [editingManager, setEditingManager] = useState(null);
  const [newManager, setNewManager] = useState({ Name: "", Nationality: "", Age: "", ExperienceYears: "", TeamID: "" });

  // Fetch Managers
  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = () => {
    axios.get("/managers")
      .then(response => setManagers(response.data))
      .catch(error => console.error("Error fetching managers:", error));
  };

  // Add Manager
  const handleAddManager = () => {
    axios.post("/managers", newManager)
      .then(() => {
        fetchManagers();
        setNewManager({ Name: "", Nationality: "", Age: "", ExperienceYears: "", TeamID: "" });
      })
      .catch(error => console.error("Error adding manager:", error));
  };

  // Delete Manager
  const handleDeleteManager = (managerId) => {
    axios.delete(`/managers/${managerId}`)
      .then(() => fetchManagers())
      .catch(error => console.error("Error deleting manager:", error));
  };

  // Edit Manager
  const handleEditManager = (managerId) => {
    axios.put(`/managers/${managerId}`, editingManager)
      .then(() => {
        fetchManagers();
        setEditingManager(null);
      })
      .catch(error => console.error("Error updating manager:", error));
  };

  return (
    <div>
      <h1>Managers</h1>

      {/* Add New Manager */}
      <div>
        <h3>Add New Manager</h3>
        <input type="text" placeholder="Name" value={newManager.Name} onChange={(e) => setNewManager({ ...newManager, Name: e.target.value })} />
        <input type="text" placeholder="Nationality" value={newManager.Nationality} onChange={(e) => setNewManager({ ...newManager, Nationality: e.target.value })} />
        <input type="number" placeholder="Age" value={newManager.Age} onChange={(e) => setNewManager({ ...newManager, Age: e.target.value })} />
        <input type="number" placeholder="Experience (Years)" value={newManager.ExperienceYears} onChange={(e) => setNewManager({ ...newManager, ExperienceYears: e.target.value })} />
        <input type="number" placeholder="Team ID" value={newManager.TeamID} onChange={(e) => setNewManager({ ...newManager, TeamID: e.target.value })} />
        <button onClick={handleAddManager}>Add Manager</button>
      </div>

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {managers.map((manager) => (
            <tr key={manager.ManagerID}>
              <td>{manager.ManagerID}</td>
              <td>
                {editingManager && editingManager.ManagerID === manager.ManagerID ? (
                  <input type="text" value={editingManager.Name} onChange={(e) => setEditingManager({ ...editingManager, Name: e.target.value })} />
                ) : (
                  manager.Name
                )}
              </td>
              <td>
                {editingManager && editingManager.ManagerID === manager.ManagerID ? (
                  <input type="text" value={editingManager.Nationality} onChange={(e) => setEditingManager({ ...editingManager, Nationality: e.target.value })} />
                ) : (
                  manager.Nationality
                )}
              </td>
              <td>
                {editingManager && editingManager.ManagerID === manager.ManagerID ? (
                  <input type="number" value={editingManager.Age} onChange={(e) => setEditingManager({ ...editingManager, Age: e.target.value })} />
                ) : (
                  manager.Age
                )}
              </td>
              <td>
                {editingManager && editingManager.ManagerID === manager.ManagerID ? (
                  <input type="number" value={editingManager.ExperienceYears} onChange={(e) => setEditingManager({ ...editingManager, ExperienceYears: e.target.value })} />
                ) : (
                  manager.ExperienceYears
                )}
              </td>
              <td>
                {editingManager && editingManager.ManagerID === manager.ManagerID ? (
                  <input type="number" value={editingManager.TeamID} onChange={(e) => setEditingManager({ ...editingManager, TeamID: e.target.value })} />
                ) : (
                  manager.TeamID
                )}
              </td>
              <td>
                {editingManager && editingManager.ManagerID === manager.ManagerID ? (
                  <>
                    <button onClick={() => handleEditManager(manager.ManagerID)}>Save</button>
                    <button onClick={() => setEditingManager(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingManager(manager)}>Edit</button>
                    <button onClick={() => handleDeleteManager(manager.ManagerID)}>Delete</button>
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

export default ManagerList;
