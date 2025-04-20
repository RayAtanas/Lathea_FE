import React, { useState, useEffect } from 'react';
import { createProject, uploadProjectFiles, uploadProjectImages, updateProject } from '../../services/AdminService';
import { Project } from '../../types/ProjectType';
import './ProjectCreationModal.css';

// Icon components for better UI
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const FileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const CancelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

// Status options for projects
const PROJECT_STATUSES = ['Finished', 'Off Plan', 'Ongoing', 'Coming Soon'];

interface ProjectCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: (project: Project) => void;
  projectToEdit: Project | null;
}

const ProjectCreationModal: React.FC<ProjectCreationModalProps> = ({
  isOpen,
  onClose,
  onProjectCreated,
  projectToEdit
}) => {
  // State for project form
  const [projectForm, setProjectForm] = useState({
    name: '',
    location: '',
    latitude: '',
    longitude: '',
    status: PROJECT_STATUSES[0],
    description: '',
  });
  
  // State for file uploads
  const [selectedSpecs, setSelectedSpecs] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  
  // State for existing files (when editing)
  const [existingSpecs, setExistingSpecs] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  
  // State for loading indicators
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // State for expanded image preview
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  // Set form values when editing a project
  useEffect(() => {
    if (isOpen && projectToEdit) {
      setProjectForm({
        name: projectToEdit.name || '',
        location: projectToEdit.location || '',
        latitude: projectToEdit.latitude !== undefined ? String(projectToEdit.latitude) : '',
        longitude: projectToEdit.longitude !== undefined ? String(projectToEdit.longitude) : '',
        status: projectToEdit.status || PROJECT_STATUSES[0],
        description: projectToEdit.description || '',
      });
      
      // Set existing files
      setExistingSpecs(projectToEdit.specs || []);
      setExistingImages(projectToEdit.image || []);
    } else if (isOpen) {
      // Reset form for new project
      resetProjectForm();
    }
  }, [isOpen, projectToEdit]);

  // Handle input change for form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProjectForm({ ...projectForm, [name]: value });
  };

  // Handle specs file selection
  const handleSpecsFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedSpecs(filesArray);
    }
  };

  // Handle image file selection
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages(filesArray);
    }
  };

  // Reset project form to initial state
  const resetProjectForm = () => {
    setProjectForm({
      name: '',
      location: '',
      latitude: '',
      longitude: '',
      status: PROJECT_STATUSES[0],
      description: '',
    });
    setSelectedSpecs([]);
    setSelectedImages([]);
    setExistingSpecs([]);
    setExistingImages([]);
    setErrorMessage('');
    setExpandedImage(null);
  };

  // Handle close with reset
  const handleClose = () => {
    resetProjectForm();
    onClose();
  };

  // Open image in a larger view
  const handleImageClick = (imagePath: string) => {
    setExpandedImage(`${baseUrl}${imagePath}`);
  };

  // Close expanded image view
  const handleCloseExpandedImage = () => {
    setExpandedImage(null);
  };

  // Handle project form submission
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Prepare data for API
      const projectData = {
        name: projectForm.name,
        location: projectForm.location,
        latitude: projectForm.latitude ? parseFloat(projectForm.latitude) : undefined,
        longitude: projectForm.longitude ? parseFloat(projectForm.longitude) : undefined,
        status: projectForm.status,
        description: projectForm.description,
        // Include existing files if editing
        specs: existingSpecs,
        image: existingImages
      };

      let savedProject: Project;
      
      if (projectToEdit) {
        // Update existing project
        savedProject = await updateProject(projectToEdit.id, projectData);
      } else {
        // Create new project
        savedProject = await createProject(projectData);
      }
      
      // Upload specs if any are selected
      if (selectedSpecs.length > 0) {
        await uploadProjectFiles(savedProject.id, selectedSpecs);
      }
      
      // Upload images if any are selected
      if (selectedImages.length > 0) {
        await uploadProjectImages(savedProject.id, selectedImages);
      }
      
      // Notify parent component
      onProjectCreated(savedProject);
      
      // Reset form and close modal
      resetProjectForm();
      onClose();
      
    } catch (error) {
      console.error('Error saving project:', error);
      setErrorMessage('Failed to save project. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Base URL for serving files
  const baseUrl = "http://localhost:8080";

  // Get filename from path, showing only part after _ or space
  const getFileName = (path: string): string => {
    // First get the base filename from the path
    const fullFileName = path.split('/').pop() || path;
    
    // Check if there's an underscore or space, and if so, show only what's after it
    if (fullFileName.includes('_')) {
      return fullFileName.split('_').pop() || fullFileName;
    } else if (fullFileName.includes(' ')) {
      return fullFileName.split(' ').slice(1).join(' ');
    }
    
    // If no underscore or space, return the full filename
    return fullFileName;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{projectToEdit ? 'Edit Project' : 'Create New Project'}</h2>
          <button 
            className="close-button"
            onClick={handleClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>
        
        {errorMessage && (
          <div className="modal-error">
            <ErrorIcon /> {errorMessage}
          </div>
        )}
        
        <form className="form" onSubmit={handleProjectSubmit}>
          <div className="form-group">
            <label htmlFor="name">Project Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={projectForm.name}
              onChange={handleInputChange}
              required
              placeholder="Enter project name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="status">Status*</label>
            <select
              id="status"
              name="status"
              value={projectForm.status}
              onChange={handleInputChange}
              required
            >
              {PROJECT_STATUSES.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                id="latitude"
                name="latitude"
                value={projectForm.latitude}
                onChange={handleInputChange}
                step="any"
                placeholder="e.g., 33.8938"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                id="longitude"
                name="longitude"
                value={projectForm.longitude}
                onChange={handleInputChange}
                step="any"
                placeholder="e.g., 35.5018"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={projectForm.location}
              onChange={handleInputChange}
              placeholder="Enter project location"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={projectForm.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Enter project description"
            />
          </div>
          
          {/* Show existing specs files if editing */}
          {projectToEdit && existingSpecs.length > 0 && (
            <div className="form-group">
              <label>Existing Specification Files:</label>
              <ul className="file-list">
                {existingSpecs.map((file, index) => (
                  <li key={index}>
                    <FileIcon />
                    <a 
                      href={`${baseUrl}${file}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title={getFileName(file)}
                    >
                      {getFileName(file)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Specification files upload */}
          <div className="form-group">
            <label htmlFor="specs">Specification Files</label>
            <div className="file-input-container">
              <label htmlFor="specs" className="file-input-button">
                <UploadIcon />
                {selectedSpecs.length > 0 ? 'Change Files' : 'Upload Files'}
              </label>
              <input
                type="file"
                id="specs"
                name="specs"
                onChange={handleSpecsFileChange}
                multiple
                style={{ display: 'none' }}
              />
            </div>
            
            {selectedSpecs.length > 0 && (
              <div className="selected-files">
                <strong>Selected files ({selectedSpecs.length}):</strong>
                <ul className="file-list">
                  {selectedSpecs.map((file, index) => (
                    <li key={index}>
                      <FileIcon />
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Show existing images if editing */}
          {projectToEdit && existingImages.length > 0 && (
            <div className="form-group">
              <label>Existing Images:</label>
              <div className="image-preview">
                {existingImages.map((img, index) => (
                  <div 
                    key={index} 
                    className="preview-image"
                    onClick={() => handleImageClick(img)}
                  >
                    <img 
                      src={`${baseUrl}${img}`} 
                      alt={`Project image ${index + 1}`} 
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Project images upload */}
          <div className="form-group">
            <label htmlFor="images">Project Images</label>
            <div className="file-input-container">
              <label htmlFor="images" className="file-input-button">
                <UploadIcon />
                {selectedImages.length > 0 ? 'Change Images' : 'Upload Images'}
              </label>
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleImageFileChange}
                multiple
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
            
            {selectedImages.length > 0 && (
              <div className="selected-files">
                <strong>Selected images ({selectedImages.length}):</strong>
                <p>{selectedImages.map(file => file.name).join(', ')}</p>
              </div>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={handleClose}
              disabled={isLoading}
            >
              <CancelIcon /> Cancel
            </button>
            <button
              type="submit"
              className="save-button"
              disabled={isLoading}
            >
              <SaveIcon /> {isLoading ? 'Saving...' : (projectToEdit ? 'Update Project' : 'Create Project')}
            </button>
          </div>
        </form>
      </div>
      
      {/* Expanded image viewer */}
      {expandedImage && (
        <div 
          className="expanded-image-overlay"
          onClick={handleCloseExpandedImage}
        >
          <div className="expanded-image-container">
            <img 
              src={expandedImage} 
              alt="Expanded view" 
              onClick={e => e.stopPropagation()}
            />
            <button 
              className="close-expanded-button"
              onClick={handleCloseExpandedImage}
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCreationModal;