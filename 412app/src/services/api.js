import axios from "axios";

// Create an Axios instance with the base URL for your backend API
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Update this with your actual backend URL
});

// Define functions to interact with each table in your database

// Fetch all teams
export const getTeams = () => API.get("/teams");

// Fetch all managers
export const getManagers = () => API.get("/managers");

// Fetch all players
export const getPlayers = () => API.get("/players");

// Fetch all player stats
export const getStats = () => API.get("/stats");

// Export the API instance for other custom requests
export default API;
