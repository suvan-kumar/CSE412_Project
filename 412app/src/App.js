import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; // Import app-specific styles
import Navbar from "./components/Navbar"; // Navbar component
import Home from "./pages/Home"; // Home page
import TeamList from "./pages/TeamList"; // Teams page
import ManagerList from "./pages/ManagerList"; // Managers page
import PlayerList from "./pages/PlayerList"; // Players page
import StatsList from "./pages/StatsList"; // Stats page
import Compare from "./pages/Compare"; // Compare Players page

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<Home />} />

            {/* Other Routes */}
            <Route path="/teams" element={<TeamList />} />
            <Route path="/managers" element={<ManagerList />} />
            <Route path="/players" element={<PlayerList />} />
            <Route path="/stats" element={<StatsList />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
