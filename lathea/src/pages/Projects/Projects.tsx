import React, { useState, useEffect } from 'react';
import { Project as ProjectType } from '../../types/ProjectType';
import { getAllProjects } from '../../services/ProjectService';
import Card from '../../components/Card/Card';
import Navbar from '../../components/Navbar/Navbar';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      className="projects-page"
      style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}
    >
      <Navbar />
      {projects.map((project) => (
        <Card
          key={project.id}
          id={project.id}
          name={project.name}
          status={project.status}
          image={project.image}
        >
          {project.location && <p><strong>Location:</strong> {project.location}</p>}
          {project.latitude !== undefined && <p><strong>Latitude:</strong> {project.latitude}</p>}
          {project.description && <p><strong>Description:</strong> {project.description}</p>}
        </Card>
      ))}
    </div>
  );
};

export default Projects;
