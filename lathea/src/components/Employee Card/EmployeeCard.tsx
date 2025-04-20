import React, { useState } from 'react';
import { Employee } from '../../types/ProjectType';
import { getImageUrl, handleImageError } from '../../utils/ImageUtils';

// Avatar placeholder component
const AvatarPlaceholder: React.FC<{ name: string }> = ({ name }) => (
  <div className="avatar-placeholder">
    {name.charAt(0).toUpperCase()}
  </div>
);

// EmployeeCard component
const EmployeeCard: React.FC<{
  employee: Employee;
  onClick: () => void;
}> = ({ employee, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(!!employee.image);
  const [imageUrl, setImageUrl] = useState<string | null>(
    employee.image ? getImageUrl(employee.image) || null : null
  );

  // Handle image error
  const handleImageLoadError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    handleImageError(e, employee.image, (newUrl) => {
      if (newUrl) {
        setImageUrl(newUrl);
      } else {
        setImageLoaded(false);
      }
    });
  };

  return (
    <div className="card employee-card" onClick={onClick}>
      <div className="card-header">
        <div className="card-avatar">
          {imageLoaded && imageUrl ? (
            <img 
              src={imageUrl} 
              alt={employee.name} 
              className="employee-avatar" 
              onError={handleImageLoadError}
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <AvatarPlaceholder name={employee.name} />
          )}
        </div>
        <div className="card-title">
          <h3>{employee.name}</h3>
          <span className="card-status status-active">
            {employee.title || 'Employee'}
          </span>
        </div>
      </div>
      <div className="card-content">
        {employee.title && <p className="card-position">{employee.title}</p>}
        {employee.email && <p className="card-contact">{employee.email}</p>}
        {employee.phoneNumber && <p className="card-contact">{employee.phoneNumber}</p>}
        {employee.linkedIn && (
          <p className="card-contact linkedin">
            <span className="linkedin-icon">in</span>
            {employee.linkedIn.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
          </p>
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;