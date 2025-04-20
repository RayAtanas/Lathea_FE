import React from 'react';
import './PartnerCard.css';

interface PartnerCardProps {
  name: string;
  imageUrl: string;
  websiteUrl: string;
  description?: string;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ 
  name, 
  imageUrl, 
  websiteUrl,
  description 
}) => {
  return (
    <div className="partner-card">
      <div className="partner-card-inner">
        <div className="partner-card-front">
          {/* Partner logo/image */}
          <div className="partner-image-container">
            {imageUrl ? (
              <img src={imageUrl} alt={`${name} logo`} className="partner-image" />
            ) : (
              <div className="partner-image-placeholder">
                <span>{name.charAt(0)}</span>
              </div>
            )}
          </div>
          <h3 className="partner-name">{name}</h3>
        </div>
        
        <div className="partner-card-back">
          <h3 className="partner-name">{name}</h3>
          {description && <p className="partner-description">{description}</p>}
          <a 
            href={websiteUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="partner-link-button"
          >
            Visit Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default PartnerCard;