import React, { useState } from 'react';
import { getImageUrl, handleImageError } from '../../utils/ImageUtils';
import './Card.css';

// Icon component for projects
const ProjectIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <path d="M9 21V9" />
  </svg>
);

export interface CardProps {
  id: number;
  name: string;
  status?: string | null;
  image?: string | string[];
  location?: string;
  projectName?: string;
  description?: string;
  onClick: () => void;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ 
  name, 
  status, 
  image, 
  location,
  projectName,
  description,
  onClick,
  children
}) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(() => {
    if (typeof image === 'string') {
      return getImageUrl(image);
    } else if (Array.isArray(image) && image.length > 0) {
      return getImageUrl(image[0]);
    }
    return undefined;
  });
  
  // Get status class for styling
  const getStatusClass = () => {
    if (!status) return 'unknown';
    
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'inprogress';
      case 'coming soon':
        return 'comingsoon';
      case 'completed':
      case 'finished':
        return 'finished';
      case 'on plan':
        return 'onplan';
      case 'off plan':
        return 'offplan';
      default:
        return 'unknown';
    }
  };

  // Truncate description text
  const truncateText = (text: string | undefined, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  // Handle image loading errors
  const handleImgError = () => {
    const imagePath = typeof image === 'string' ? image : (Array.isArray(image) && image.length > 0 ? image[0] : undefined);
    // Create a fake event object
    const event = {
      currentTarget: { src: imageUrl || '' } as HTMLImageElement
    } as React.SyntheticEvent<HTMLImageElement, Event>;
    
    handleImageError(event, imagePath, (newUrl) => {
      setImageUrl(newUrl || undefined);
    });
  };

  return (
    <div
      className="card"
      style={{
        backgroundImage: imageUrl ? `url("${imageUrl}")` : undefined,
      }}
      onClick={onClick}
      onError={handleImgError} // Add error handling for background image
    >
      {/* Dark overlay */}
      <div className="overlay"></div>

      {/* Always visible header */}
      <div className="card-header">
        <h3>{`${name}`}</h3>
        <div className={`status-badge ${getStatusClass()}`}>
          {status || 'Unknown'}
        </div>
      </div>

      {/* Details shown only on hover */}
      <div className="card-details">
        {projectName && (
          <div className="project-name">
            <ProjectIcon />
            {projectName}
          </div>
        )}
        
        {location && <p><strong>Location:</strong> {location}</p>}
        
        {description && (
          <p className="description">
            {truncateText(description, 100)}
          </p>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default Card;