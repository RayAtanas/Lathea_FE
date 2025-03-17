import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById } from '../../services/ProjectService';
import Navbar from '../../components/Navbar/Navbar';
import Card from '../../components/Card/Card';
import ApartmentModal from '../../modal/Apartment Modal/ApartmentModal';
import { Project as ProjectType, Apartment } from '../../types/ProjectType';
import './Project.css';

const Project: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(Number(id));
        setProject(data);
      } catch (err) {
        console.error(err);
        setError('Error fetching project details');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <div>Loading project...</div>;
  if (error) return <div>{error}</div>;
  if (!project) return <div>No project found</div>;

  // Base URL for serving files
  const baseUrl = "http://localhost:8080";

  const handleApartmentClick = (apartment: Apartment) => {
    setSelectedApartment(apartment);
  };

  const closeModal = () => {
    setSelectedApartment(null);
  };

  return (
    <div className="project-page">
      <Navbar />

      {/* Project Header: Using the first project image as a background */}
      <div
        className="project-background"
        style={{
          backgroundImage: project.image && project.image.length > 0 ? `url("${baseUrl}${encodeURI(project.image[0])}")` : undefined,
          height: '10vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginBottom: '1rem',
        }}
      ></div>

      {/* Apartments Section */}
      <div className="apartments-section" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {project.apartments && project.apartments.map((apartment) => (
          <div
            key={apartment.id}
            onClick={() => handleApartmentClick(apartment)}
            style={{ cursor: 'pointer' }}
          >
            <Card
              id={apartment.id}
              name={apartment.name}
              status={apartment.status}
              image={
                apartment.image && apartment.image.length > 0
                  ? apartment.image
                  : project.image
              }
            >
              {/* Additional apartment details (if any) */}
            </Card>
          </div>
        ))}
      </div>

      {/* Project Images Section */}
      <div className="project-images-section" style={{ marginTop: '2rem' }}>
        <h2>Project Images</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {project.image && project.image.map((img, index) => (
            <div key={index} className="project-image" style={{ flex: '1 0 200px' }}>
              <img
                src={`${baseUrl}${encodeURI(img)}`}
                alt={`Project image ${index + 1}`}
                style={{ width: '100%' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Project Specs Section */}
      <div className="project-specs-section" style={{ marginTop: '2rem' }}>
        <h2>Project Specs</h2>
        <ul>
          {project.specs && project.specs.map((spec, index) => (
            <li key={index}>
              <a
                href={`${baseUrl}${encodeURI(spec)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Spec File {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Apartment Modal */}
      {selectedApartment && (
        <ApartmentModal apartment={selectedApartment} onClose={closeModal} />
      )}
    </div>
  );
};

export default Project;
