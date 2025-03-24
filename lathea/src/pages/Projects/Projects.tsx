import React, { useState, useEffect, useRef } from 'react';
import { Project as ProjectType } from '../../types/ProjectType';
import { getAllProjects } from '../../services/ProjectService';
import Card from '../../components/Card/Card';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import './Projects.css';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [animateCards, setAnimateCards] = useState<boolean>(false);
  const projectsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
        // Delay animation to allow page to render
        setTimeout(() => setAnimateCards(true), 100);
      } catch (err) {
        console.error(err);
        setError('Error fetching projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    // Add scroll listener for animations
    const handleScroll = () => {
      if (projectsRef.current) {
        const rect = projectsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setAnimateCards(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCardClick = (id: number) => {
    navigate(`/project/${id}`);
  };

  const getUniqueStatuses = () => {
    const statuses = projects.map(project => project.status).filter(Boolean) as string[];
    return ['all', ...new Set(statuses)];
  };

  
  // Apply filters and search
  const filteredProjects = projects.filter(project => {
    // Apply status filter
    if (filter !== 'all' && project.status?.toLowerCase() !== filter.toLowerCase()) {
      return false;
    }
    
    // Apply search term
    if (searchTerm && searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = project.name?.toLowerCase().includes(searchLower);
      const locationMatch = project.location?.toLowerCase().includes(searchLower);
      const descriptionMatch = project.description?.toLowerCase().includes(searchLower);
      
      return nameMatch || locationMatch || descriptionMatch;
    }
    
    return true;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <Navbar />
      
      <div className="projects-hero">
        <div className="projects-hero-content">
          {/* Search bar moved higher in the hero section */}
          <div className="hero-search">
            <input 
              type="text" 
              placeholder="Search by name, location, or features..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="projects-container" ref={projectsRef}>
        <div className="projects-filters">
          <div className="filters-section">
            <h3>Filter by Status</h3>
            <div className="filter-buttons">
              {getUniqueStatuses().map(status => (
                <button 
                  key={status} 
                  className={`filter-button ${filter === status ? 'active' : ''}`}
                  onClick={() => setFilter(status)}
                >
                  {status === 'all' ? 'All Projects' : status}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="projects-results">
          <div className="results-header">
            <h2>Available Projects</h2>
            <div className="results-count">
              Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            </div>
          </div>
          
          {filteredProjects.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No projects found</h3>
              <p>Try adjusting your search criteria or filters</p>
              <button className="reset-filters" onClick={() => {
                setFilter('all');
                setSearchTerm('');
              }}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className={`projects-grid ${animateCards ? 'animate' : ''}`}>
              {filteredProjects.map((project, index) => (
                <div 
                  key={project.id} 
                  className="card-wrapper"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    opacity: animateCards ? 1 : 0,
                    transform: animateCards ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  <Card
                    id={project.id}
                    name={project.name}
                    status={project.status}
                    image={project.image}
                    location={project.location}
                    description={project.description}
                    onClick={() => handleCardClick(project.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;