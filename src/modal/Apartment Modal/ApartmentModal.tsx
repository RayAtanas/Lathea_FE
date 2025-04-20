import React, { useEffect, useState } from 'react';
import './ApartmentModal.css';

export interface Apartment {
  id: number;
  name: string;
  status: string;
  description?: string;
  image?: string[];
  flatPlan?: string[];
  projectId?: number;
}

export interface ApartmentModalProps {
  apartment: Apartment;
  onClose: () => void;
}

const baseUrl = "http://localhost:8080"; // Adjust as needed

const ApartmentModal: React.FC<ApartmentModalProps> = ({ apartment, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Disable scrolling on the background when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      // Restore scrolling on background when modal is closed
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Helper function to get a displayable URL from a Blob or string
  const getFileUrl = (file: Blob | string) => {
    if (file instanceof Blob) {
      // Create a temporary URL for the blob
      return URL.createObjectURL(file);
    } else if (typeof file === 'string') {
      // Assume it's a relative path
      return `${baseUrl}${encodeURI(file)}`;
    }
    return '';
  };
  
  // Handle click on overlay but not content
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="modal-inner-content">
          {/* Left Column - Images */}
          <div className="modal-left-column">
            {/* Featured Image */}
            {apartment.image && apartment.image.length > 0 && (
              <div className="featured-image-container">
                <img 
                  src={getFileUrl(apartment.image[selectedImageIndex])} 
                  alt={`${apartment.name} main view`}
                  className="featured-image"
                />
                
                {/* Image Navigation */}
                {apartment.image.length > 1 && (
                  <div className="image-navigation">
                    <button 
                      className="nav-button prev" 
                      onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? apartment.image!.length - 1 : prev - 1))}
                      aria-label="Previous image"
                    >
                      ‹
                    </button>
                    <button 
                      className="nav-button next" 
                      onClick={() => setSelectedImageIndex((prev) => (prev === apartment.image!.length - 1 ? 0 : prev + 1))}
                      aria-label="Next image"
                    >
                      ›
                    </button>
                  </div>
                )}
                
                {/* Image Indicator */}
                {apartment.image.length > 1 && (
                  <div className="image-indicator">
                    {selectedImageIndex + 1} / {apartment.image.length}
                  </div>
                )}
              </div>
            )}
            
            {/* Thumbnail Gallery */}
            {apartment.image && apartment.image.length > 1 && (
              <div className="thumbnail-gallery">
                {apartment.image.map((img, index) => (
                  <div 
                    key={index} 
                    className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img
                      src={getFileUrl(img)}
                      alt={`${apartment.name} view ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Right Column - Details */}
          <div className="modal-right-column">
            {/* Apartment Header */}
            <div className="apartment-header">
              <h2>{apartment.name}</h2>
              <div className={`status-badge status-${apartment.status.toLowerCase()}`}>
                {apartment.status}
              </div>
            </div>
            
            {/* Description */}
            {apartment.description && (
              <div className="apartment-description">
                <h3>Description</h3>
                <p>{apartment.description}</p>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="primary-button">Contact About This Property</button>
              <button className="secondary-button">Download Details</button>
            </div>
          </div>
        </div>
        
        {/* Floor Plans Section */}
        {apartment.flatPlan && apartment.flatPlan.length > 0 && (
          <div className="floor-plans-section">
            <h3>Floor Plans</h3>
            <div className="floor-plans-grid">
              {apartment.flatPlan.map((plan, index) => (
                <div key={index} className="floor-plan-item">
                  <a
                    href={getFileUrl(plan)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="floor-plan-link"
                  >
                    <div className="floor-plan-image">
                      <img
                        src={getFileUrl(plan)}
                        alt={`${apartment.name} floor plan ${index + 1}`}
                      />
                    </div>
                    <div className="floor-plan-caption">
                      Floor Plan {index + 1}
                      <span className="view-larger">View Larger</span>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApartmentModal;