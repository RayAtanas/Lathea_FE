import React, { useState, useEffect } from 'react';
import './Carousel.css';

export interface CarouselItem {
  src: string;
  title: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  // Ensure that we have at least one image (and at most 4)
  const carouselItems = items.slice(0, 4);
  const [currentIndex, setCurrentIndex] = useState(0);

  // White line decoration element beneath the title
  const WhiteLine = () => (
    <div style={{ 
      width: "500px", 
      height: "3px", 
      backgroundColor: "white", 
      margin: "20px auto",
      display: "block"
    }}></div>
  );

  // Auto-rotate functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Check if image has an error
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.error("Image failed to load");
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log("Image loaded successfully");
    setImageError(false);
  };

  useEffect(() => {
    // Reset image state on slide change
    setImageError(false);
  }, [currentIndex]);

  useEffect(() => {
    // Log carousel items for debugging
    console.log("Carousel items:", carouselItems);
  }, [carouselItems]);

  return (
    <div className="carousel">
      <div className="carousel-item-container">
        {!imageError ? (
          <img
            src={carouselItems[currentIndex].src}
            alt={carouselItems[currentIndex].title}
            className="carousel-image"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          <div className="carousel-image-fallback">
            <span style={{ color: "white", fontSize: "16px" }}>Image not available</span>
          </div>
        )}
        <div className="carousel-title">
          {carouselItems[currentIndex].title}
          <WhiteLine />
        </div>
      </div>
      <button className="carousel-button prev" onClick={handlePrev}>
        &#8249;
      </button>
      <button className="carousel-button next" onClick={handleNext}>
        &#8250;
      </button>
    </div>
  );
};

export default Carousel;