import React, { useState, useEffect, useMemo } from 'react';
import { getAllProjects, getAllApartments } from '../../services/AdminService';
import { Project, Apartment } from '../../types/ProjectType';
import ProjectCreationModal from '../../modal/Create Project Modal/ProjectCreationModal';
import ApartmentCreationModal from '../../modal/Create Apartment Modal/ApartmentCreationModal';
import Card from '../../components/Card/Card'; // Import the updated Card component
import './AdminDashboard.css';

// Icon components for better visual cues
const ProjectIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <path d="M9 21V9" />
  </svg>
);

const ApartmentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

// Empty state component
const EmptyState: React.FC<{
  type: string;
  onCreateClick: () => void;
}> = ({ type, onCreateClick }) => (
  <div className="empty-state">
    <div className="empty-state-icon">
      {type === 'projects' ? <ProjectIcon /> : <ApartmentIcon />}
    </div>
    <p className="empty-state-message">
      No {type} found
    </p>
    <button className="action-button" onClick={onCreateClick}>
      <PlusIcon />
      Create {type === 'projects' ? 'Project' : 'Apartment'}
    </button>
  </div>
);

// Loading state component
const LoadingState = () => (
  <div className="loading-indicator">
    <div className="loading-spinner"></div>
  </div>
);

const AdminDashboard: React.FC = () => {
  // State for projects and apartments list
  const [projects, setProjects] = useState<Project[]>([]);
  const [apartments, setApartments] = useState<Apartment[]>([]);
  
  // State for active tab
  const [activeTab, setActiveTab] = useState<'projects' | 'apartments'>('projects');
  
  // State for modal visibility
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isApartmentModalOpen, setIsApartmentModalOpen] = useState(false);
  
  // State for selected project or apartment for editing
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  
  // State for loading indicators
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch data on component mount
  useEffect(() => {
    fetchProjects();
    fetchApartments();
  }, []);

  // Fetch projects with error handling
  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const data = await getAllProjects();
      setProjects(data);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching projects:', error);
      setErrorMessage('Failed to load projects. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch apartments with error handling
  const fetchApartments = async () => {
    setIsLoading(true);
    try {
      const data = await getAllApartments();
      setApartments(data);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching apartments:', error);
      setErrorMessage('Failed to load apartments. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Memoized project map for better performance
  const projectsMap = useMemo(() => {
    return projects.reduce((acc, project) => {
      acc[project.id] = project;
      return acc;
    }, {} as Record<number, Project>);
  }, [projects]);

  // Handle project created or updated
  const handleProjectSaved = () => {
    fetchProjects();
    setSelectedProject(null);
    setIsProjectModalOpen(false);
  };

  // Handle apartment created or updated
  const handleApartmentSaved = () => {
    fetchApartments();
    setSelectedApartment(null);
    setIsApartmentModalOpen(false);
  };

  // Open project modal for creation
  const handleCreateProject = () => {
    setSelectedProject(null);
    setIsProjectModalOpen(true);
  };

  // Open apartment modal for creation
  const handleCreateApartment = () => {
    setSelectedApartment(null);
    setIsApartmentModalOpen(true);
  };

  // Handle project card click for editing
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  // Handle apartment card click for editing
  const handleApartmentClick = (apartment: Apartment) => {
    setSelectedApartment(apartment);
    setIsApartmentModalOpen(true);
  };

  // Get project name by ID using the memoized map
  const getProjectNameById = (projectId: number): string => {
    return projectsMap[projectId]?.name || 'Unknown Project';
  };

  return (
    <div className="admin-dashboard">
      
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="dashboard-actions">
          <button 
            className="action-button"
            onClick={handleCreateProject}
            aria-label="Create Project"
          >
            <PlusIcon />
            Create Project
          </button>
          <button 
            className="action-button"
            onClick={handleCreateApartment}
            aria-label="Create Apartment"
          >
            <PlusIcon />
            Create Apartment
          </button>
        </div>
      </header>

      {errorMessage && (
        <div className="error-message" role="alert">
          <ErrorIcon />
          {errorMessage}
        </div>
      )}

      <div className="dashboard-tabs" role="tablist">
        <button 
          className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
          role="tab"
          aria-selected={activeTab === 'projects'}
          aria-controls="projects-panel"
          id="projects-tab"
        >
          <ProjectIcon />
          Projects
        </button>
        <button 
          className={`tab-button ${activeTab === 'apartments' ? 'active' : ''}`}
          onClick={() => setActiveTab('apartments')}
          role="tab"
          aria-selected={activeTab === 'apartments'}
          aria-controls="apartments-panel"
          id="apartments-tab"
        >
          <ApartmentIcon />
          Apartments
        </button>
      </div>

      {activeTab === 'projects' && (
        <div 
          className="cards-container" 
          role="tabpanel" 
          id="projects-panel"
          aria-labelledby="projects-tab"
        >
          <h2>
            <ProjectIcon />
            Projects ({projects.length})
          </h2>
          
          {isLoading ? (
            <LoadingState />
          ) : projects.length === 0 ? (
            <EmptyState type="projects" onCreateClick={handleCreateProject} />
          ) : (
            <div className="cards-grid">
              {projects.map(project => (
                <Card
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  status={project.status}
                  image={project.image}
                  location={project.location}
                  description={project.description}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'apartments' && (
        <div 
          className="cards-container" 
          role="tabpanel" 
          id="apartments-panel"
          aria-labelledby="apartments-tab"
        >
          <h2>
            <ApartmentIcon />
            Apartments ({apartments.length})
          </h2>
          
          {isLoading ? (
            <LoadingState />
          ) : apartments.length === 0 ? (
            <EmptyState type="apartments" onCreateClick={handleCreateApartment} />
          ) : (
            <div className="cards-grid">
              {apartments.map(apartment => (
                <Card
                  key={apartment.id}
                  id={apartment.id}
                  name={apartment.name}
                  status={apartment.status}
                  image={apartment.image}
                  description={apartment.description}
                  projectName={apartment.projectId ? getProjectNameById(apartment.projectId) : undefined}
                  onClick={() => handleApartmentClick(apartment)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Project Modal - Handles both create and edit */}
      <ProjectCreationModal 
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false);
          setSelectedProject(null);
        }}
        onProjectCreated={handleProjectSaved}
        projectToEdit={selectedProject}
      />

      {/* Apartment Modal - Handles both create and edit */}
      <ApartmentCreationModal 
        isOpen={isApartmentModalOpen}
        onClose={() => {
          setIsApartmentModalOpen(false);
          setSelectedApartment(null);
        }}
        onApartmentCreated={handleApartmentSaved}
        apartmentToEdit={selectedApartment}
        projects={projects}
      />
    </div>
  );
};

export default AdminDashboard;