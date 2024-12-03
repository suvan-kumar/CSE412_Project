import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Ensure this matches your backend's base URL
});

// Team API calls
export const getTeams = () => API.get("/teams");
export const getTeamById = (id) => API.get(`/teams?id=${id}`);

// Manager API calls
export const getManagers = () => API.get("/managers");
export const getManagerById = (id) => API.get(`/managers?id=${id}`);

// Player API calls
export const getPlayers = () => API.get("/players");
export const getPlayerById = (id) => API.get(`/players?id=${id}`);

// Stats API calls
export const getStats = () => API.get("/stats");
export const getStatsByPlayerId = (id) => API.get(`/stats?id=${id}`);

export default API;
