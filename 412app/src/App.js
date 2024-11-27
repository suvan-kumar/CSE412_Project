import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TeamList from "./pages/TeamList";
import ManagerList from "./pages/ManagerList";
import PlayerList from "./pages/PlayerList";
import StatsList from "./pages/StatsList";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<TeamList />} />
        <Route path="/managers" element={<ManagerList />} />
        <Route path="/players" element={<PlayerList />} />
        <Route path="/stats" element={<StatsList />} />
      </Routes>
    </Router>
  );
}

export default App;
