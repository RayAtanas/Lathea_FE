import React, { useState, useEffect } from 'react';
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError('Error fetching projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCardClick = (id: number) => {
    // Navigate to the project detail page passing the project id in the URL
    navigate(`/project/${id}`);
  };

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
      <div className="page-header">
        <h1>Projects</h1>
      </div>
      <div className="projects-grid">
        {projects.map((project) => (
          <Card
            key={project.id}
            id={project.id}
            name={project.name}
            status={project.status}
            image={project.image}
            location={project.location}
            description={project.description}
            onClick={() => handleCardClick(project.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;