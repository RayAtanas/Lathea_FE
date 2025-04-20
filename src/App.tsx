import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
import PropertyManagement from './pages/PM/PropertyManagement';
import ProjectManagement from './pages/Project Management/ProjectManagement';
import Consultancy from './pages/Consultancy/Consultancy';
import InteriorDesign from './pages/InteriorDesign/InteriorDesign';
import Partners from './pages/Partner/Partner';
import TeamPage from './pages/Team Page/TeamPage';

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
        <Route path="/property-management" element={<PropertyManagement />} />
        <Route path="/project-management" element={<ProjectManagement />} />
        <Route path="/consultancy" element={<Consultancy />} />
        <Route path="/interior" element={<InteriorDesign />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>
    </Router>
  );
};

export default App;
