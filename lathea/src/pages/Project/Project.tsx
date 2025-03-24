import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById } from '../../services/ProjectService';
import Navbar from '../../components/Navbar/Navbar';
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

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading project...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <p>{error}</p>
    </div>
  );
  
  if (!project) return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <p>No project found</p>
    </div>
  );

  // Base URL for serving files
  const baseUrl = "http://localhost:8080";

  const handleApartmentClick = (apartment: Apartment) => {
    setSelectedApartment(apartment);
  };

  const closeModal = () => {
    setSelectedApartment(null);
  };

  // Format status name for class (remove spaces and lowercase)
  const getStatusClass = (status?: string) => {
    if (!status) return '';
    return status.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="project-page">
      <Navbar />

      {/* Project Header */}
      <div className="project-header">
        <div
          className="project-banner"
          style={{
            backgroundImage: project.image && project.image.length > 0 
              ? `url("${baseUrl}${encodeURI(project.image[0])}")` 
              : undefined,
          }}
        >
          <div className="project-overlay">
            <div className="project-info">
              <h1>{project.name}</h1>
              {project.location && (
                <p className="project-location">
                  <span className="location-icon"></span>
                  {project.location}
                </p>
              )}
            </div>
            <div className="project-status-container">
              {project.status && (
                <span className={`status-badge status-${getStatusClass(project.status)}`}>
                  {project.status}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="project-content">
        {/* Apartments Section */}
        {project.apartments && project.apartments.length > 0 && (
          <div className="project-section">
            <div className="section-header">
              <h2 className="section-title">Available Apartments</h2>
              <span className="apartments-count">{project.apartments.length} units</span>
            </div>
            <div className="apartments-grid">
              {project.apartments.map((apartment) => (
                <div
                  key={apartment.id}
                  className="apartment-card"
                  onClick={() => handleApartmentClick(apartment)}
                >
                  <div className="apartment-image">
                    {apartment.image && apartment.image.length > 0 ? (
                      <img 
                        src={`${baseUrl}${encodeURI(apartment.image[0])}`} 
                        alt={apartment.name} 
                      />
                    ) : project.image && project.image.length > 0 ? (
                      <img 
                        src={`${baseUrl}${encodeURI(project.image[0])}`} 
                        alt={apartment.name} 
                      />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                    <span className={`status-badge status-${getStatusClass(apartment.status)}`}>
                      {apartment.status}
                    </span>
                  </div>
                  <div className="apartment-details">
                    <h3>{apartment.name}</h3>
                    <div className="view-details">
                      <span>View Details</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Project Description */}
        {project.description && (
          <div className="project-section">
            <h2 className="section-title">About this project</h2>
            <div className="project-description">
              <p>{project.description}</p>
            </div>
          </div>
        )}

        {/* Project Images Section */}
        {project.image && project.image.length > 0 && (
          <div className="project-section">
            <h2 className="section-title">Project Gallery</h2>
            <div className="project-gallery">
              {project.image.map((img, index) => (
                <div key={index} className="gallery-image">
                  <img
                    src={`${baseUrl}${encodeURI(img)}`}
                    alt={`Project image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Specs Section */}
        {project.specs && project.specs.length > 0 && (
          <div className="project-section">
            <h2 className="section-title">Project Specifications</h2>
            <div className="project-specs">
              <ul className="specs-list">
                {project.specs.map((spec, index) => (
                  <li key={index} className="spec-item">
                    <a
                      href={`${baseUrl}${encodeURI(spec)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="spec-link"
                    >
                      <span className="spec-icon">📄</span>
                      <span>Specification Document {index + 1}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Apartment Modal */}
      {selectedApartment && (
        <ApartmentModal apartment={selectedApartment} onClose={closeModal} />
      )}
    </div>
  );
};

export default Project;