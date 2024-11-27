import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; // Import app-specific styles
import Navbar from "./components/Navbar"; // Navbar component
import Home from "./pages/Home"; // Home page
import TeamList from "./pages/TeamList"; // Teams page
import ManagerList from "./pages/ManagerList"; // Managers page
import PlayerList from "./pages/PlayerList"; // Players page
import StatsList from "./pages/StatsList"; // Stats page

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teams" element={<TeamList />} />
            <Route path="/managers" element={<ManagerList />} />
            <Route path="/players" element={<PlayerList />} />
            <Route path="/stats" element={<StatsList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
