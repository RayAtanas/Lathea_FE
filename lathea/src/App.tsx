import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home Page/HomePage';
import Projects from './pages/Projects/Projects';
import Project from './pages/Project/Project';
import AdminDashboard from './pages/Admin Dashboard/AdminDashboard';
import ChairmanMessage from './pages/Message From Chairman/ChairmanMessage';
import ChooseLathea from './pages/Choose Lathea/ChooseLathea';
import Mission from './pages/Mission/Mission';
import Values from './pages/Values/Values';
import MarketStudy from './pages/Market Study/MarketStudy';
import Development from './pages/Development/Development';
import Contracting from './pages/Contracting/Contracting';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<Project />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/chairman" element={<ChairmanMessage />} />
        <Route path="/choose-lathea" element={<ChooseLathea />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/values" element={<Values />} />
        <Route path="/market-studies" element={<MarketStudy />} />
        <Route path="/development" element={<Development />} />
        <Route path="/contracting" element={<Contracting />} />
      </Routes>
    </Router>
  );
};

export default App;
