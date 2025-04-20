// src/utils/ImageUtils.ts

/**
 * Utility for consistently handling image URLs across the application
 */

// Base URL for the backend
export const API_BASE_URL = 'http://localhost:8080';

/**
 * Formats an image URL consistently based on the image path
 * 
 * @param imagePath - The image path from the API
 * @returns A fully qualified URL to the image
 */
export const getImageUrl = (imagePath: string | undefined | null): string | undefined => {
  if (!imagePath) return undefined;
  
  // If it's already a full URL, return it as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // If it starts with a slash, append it to the base URL
  if (imagePath.startsWith('/')) return `${API_BASE_URL}${imagePath}`;
  
  // Otherwise, assume it's a relative path and prepend with slash
  return `${API_BASE_URL}/${imagePath}`;
};

/**
 * Backup image URL patterns to try if the primary URL fails to load
 * 
 * @param imagePath - The original image path from the API
 * @returns An array of alternative URLs to try
 */
export const getBackupImageUrls = (imagePath: string | undefined | null): string[] => {
  if (!imagePath) return [];
  
  const urls: string[] = [];
  
  // If it's already a full URL, no alternatives needed
  if (imagePath.startsWith('http')) return [];
  
  // Add alternatives with different prefixes
  if (imagePath.startsWith('/')) {
    urls.push(`${API_BASE_URL}/api/images${imagePath}`);
    urls.push(`${API_BASE_URL}/api/files${imagePath}`);
  } else {
    urls.push(`${API_BASE_URL}/api/images/${imagePath}`);
    urls.push(`${API_BASE_URL}/api/files/${imagePath}`);
  }
  
  return urls;
};

/**
 * Generic image error handler component
 * 
 * @param event - The error event from the img element
 * @param imagePath - The original image path
 * @param setImageUrl - Function to update the image URL
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  imagePath: string | undefined | null,
  setImageUrl?: (url: string | null) => void
): void => {
  console.error("Image failed to load:", event.currentTarget.src);
  
  // Get alternative URLs to try
  const backupUrls = getBackupImageUrls(imagePath);
  
  // Try the next URL if available
  const currentSrc = event.currentTarget.src;
  const nextUrlIndex = backupUrls.findIndex(url => url === currentSrc) + 1;
  
  if (nextUrlIndex > 0 && nextUrlIndex < backupUrls.length) {
    console.log("Trying alternative URL:", backupUrls[nextUrlIndex]);
    event.currentTarget.src = backupUrls[nextUrlIndex];
  } else if (backupUrls.length > 0 && currentSrc !== backupUrls[0]) {
    // Try the first backup URL
    console.log("Trying first alternative URL:", backupUrls[0]);
    event.currentTarget.src = backupUrls[0];
  } else {
    // If all alternatives failed or there are none, clear the image
    event.currentTarget.src = ''; 
    if (setImageUrl) setImageUrl(null);
  }
};