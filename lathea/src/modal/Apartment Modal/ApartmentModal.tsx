// src/components/ApartmentModal/ApartmentModal.tsx
import React, { useEffect } from 'react';
import { Apartment } from '../../types/ProjectType';
import './ApartmentModal.css';

export interface ApartmentModalProps {
  apartment: Apartment;
  onClose: () => void;
}

const baseUrl = "http://localhost:8080"; // Adjust as needed

const ApartmentModal: React.FC<ApartmentModalProps> = ({ apartment, onClose }) => {
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

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Stop click propagation so we don't close the modal when clicking inside content */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close" onClick={onClose}>
          Close
        </button>

        {/* Apartment Title & Status */}
        <h2>{apartment.name}</h2>
        <p>Status: {apartment.status}</p>

        {/* Apartment Images Section */}
        {apartment.image && apartment.image.length > 0 && (
          <div className="modal-section">
            <h3>Images</h3>
            <div className="modal-images-grid">
              {apartment.image.map((img, index) => {
                const fileUrl = getFileUrl(img);
                return (
                  <a
                    key={index}
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={fileUrl}
                      alt={`${apartment.name} image ${index + 1}`}
                      style={{ width: '100%', cursor: 'pointer' }}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Apartment Flat Plans Section */}
        {apartment.flatPlan && apartment.flatPlan.length > 0 && (
          <div className="modal-section">
            <h3>Flat Plans</h3>
            <div className="modal-images-grid">
              {apartment.flatPlan.map((plan, index) => {
                const planUrl = getFileUrl(plan);
                return (
                  <a
                    key={index}
                    href={planUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={planUrl}
                      alt={`${apartment.name} flat plan ${index + 1}`}
                      style={{ width: '100%', cursor: 'pointer' }}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApartmentModal;
