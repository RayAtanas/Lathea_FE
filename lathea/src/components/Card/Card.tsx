import React from 'react';
import './Card.css';

export interface CardProps {
  id: number;
  name: string;
  status?: string | null;
  image?: string[];
  children?: React.ReactNode; // Explicitly include children in the props
}

const Card: React.FC<CardProps> = ({ id, name, status, image, children }) => {
  const baseUrl = "http://localhost:8080"; // Adjust this as needed
  const imageUrl =
    image && image.length > 0 ? `${baseUrl}${encodeURI(image[0])}` : undefined;

  return (
    <div
      className="card"
      style={{
        backgroundImage: imageUrl ? `url("${imageUrl}")` : undefined,
      }}
    >
      {/* Dark overlay */}
      <div className="overlay" />

      {/* Always visible header */}
      <div className="card-header">
        <h3>{`#${id} - ${name}`}</h3>
        <p>Status: {status || 'Unknown'}</p>
      </div>

      {/* Details shown only on hover */}
      <div className="card-details">
        {children}
      </div>
    </div>
  );
};

export default Card;
