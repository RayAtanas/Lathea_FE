import React, { useState, useEffect } from 'react';
import { createApartment, uploadApartmentFiles, uploadApartmentImages, linkApartmentToProject, updateApartment } from '../../services/AdminService';
import { Apartment, Project } from '../../types/ProjectType';
import './ApartmentCreationModal.css';

// Status options for apartments
const APARTMENT_STATUSES = ['Finished', 'Off Plan', 'Ongoing', 'Coming Soon', 'AVAILABLE', 'SOLD', 'RESERVED'];

interface ApartmentCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApartmentCreated: (apartment: Apartment) => void;
  apartmentToEdit: Apartment | null;
  projects: Project[];
}

// We'll create a form state interface that includes the UI fields not in the Apartment interface
interface ApartmentFormState {
  name: string;
  status: string;
  description: string;
  projectId: string;

}

const ApartmentCreationModal: React.FC<ApartmentCreationModalProps> = ({
  isOpen,
  onClose,
  onApartmentCreated,
  apartmentToEdit,
  projects
}) => {
  // State for apartment form
  const [apartmentForm, setApartmentForm] = useState<ApartmentFormState>({
    name: '',
    status: APARTMENT_STATUSES[0],
    description: '',
    projectId: ''
  });
  
  // State for file uploads
  const [selectedFlatPlans, setSelectedFlatPlans] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  
  // State for existing files (when editing)
  const [existingFlatPlans, setExistingFlatPlans] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  
  // State for loading indicators
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Set form values when editing an apartment
  useEffect(() => {
    if (isOpen) {
      if (apartmentToEdit) {
        // Edit mode - populate form with apartment data
        setApartmentForm({
          name: apartmentToEdit.name || '',
          status: apartmentToEdit.status || APARTMENT_STATUSES[0],
          description: apartmentToEdit.description || '',
          projectId: apartmentToEdit.projectId !== undefined ? String(apartmentToEdit.projectId) : ''
        });
        
        // Set existing files
        setExistingFlatPlans(apartmentToEdit.flatPlan || []);
        setExistingImages(apartmentToEdit.image || []);
      } else {
        // Create mode - set default project if available
        resetApartmentForm();
        if (projects.length > 0) {
          setApartmentForm(prev => ({
            ...prev,
            projectId: String(projects[0].id)
          }));
        }
      }
    }
  }, [isOpen, apartmentToEdit, projects]);

  // Handle input change for form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setApartmentForm({ ...apartmentForm, [name]: value });
  };

  // Handle flat plan file selection
  const handleFlatPlanFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFlatPlans(filesArray);
    }
  };

  // Handle image file selection
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages(filesArray);
    }
  };

  // Reset apartment form to initial state
  const resetApartmentForm = () => {
    setApartmentForm({
      name: '',
      status: APARTMENT_STATUSES[0],
      description: '',
      projectId: projects.length > 0 ? String(projects[0].id) : ''
    });
    setSelectedFlatPlans([]);
    setSelectedImages([]);
    setExistingFlatPlans([]);
    setExistingImages([]);
    setErrorMessage('');
  };

  // Handle close with reset
  const handleClose = () => {
    resetApartmentForm();
    onClose();
  };

  // Handle apartment form submission
  const handleApartmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Prepare data for API - only include fields that are in the Apartment model
      const apartmentData = {
        name: apartmentForm.name,
        status: apartmentForm.status,
        description: apartmentForm.description,
        projectId: apartmentForm.projectId ? parseInt(apartmentForm.projectId) : undefined,
        // Include existing files if editing
        flatPlan: existingFlatPlans,
        image: existingImages
      };

      let savedApartment: Apartment;
      
      if (apartmentToEdit) {
        // Update existing apartment
        savedApartment = await updateApartment(apartmentToEdit.id, apartmentData);
      } else {
        // Create new apartment
        savedApartment = await createApartment(apartmentData);
        
        // If creating new apartment and project selected, link them
        if (apartmentForm.projectId && !apartmentData.projectId) {
          await linkApartmentToProject(savedApartment.id, parseInt(apartmentForm.projectId));
        }
      }
      
      // Upload flat plans if any are selected
      if (selectedFlatPlans.length > 0) {
        await uploadApartmentFiles(savedApartment.id, selectedFlatPlans);
      }
      
      // Upload images if any are selected
      if (selectedImages.length > 0) {
        await uploadApartmentImages(savedApartment.id, selectedImages);
      }
      
      // Notify parent component
      onApartmentCreated(savedApartment);
      
      // Reset form and close modal
      resetApartmentForm();
      onClose();
      
    } catch (error) {
      console.error('Error saving apartment:', error);
      setErrorMessage('Failed to save apartment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Base URL for serving files
  const baseUrl = "http://localhost:8080";

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{apartmentToEdit ? 'Edit Apartment' : 'Create New Apartment'}</h2>
          <button 
            className="close-button"
            onClick={handleClose}
          >
            &times;
          </button>
        </div>
        
        {errorMessage && (
          <div className="modal-error">
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={handleApartmentSubmit}>
          <div className="form-group">
            <label htmlFor="name">Apartment Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={apartmentForm.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="status">Status*</label>
            <select
              id="status"
              name="status"
              value={apartmentForm.status}
              onChange={handleInputChange}
              required
            >
              {APARTMENT_STATUSES.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="projectId">Project*</label>
            <select
              id="projectId"
              name="projectId"
              value={apartmentForm.projectId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
          
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={apartmentForm.description}
              onChange={handleInputChange}
              rows={4}
            />
          </div>
          
          {/* Show existing flat plans if editing */}
          {apartmentToEdit && existingFlatPlans.length > 0 && (
            <div className="form-group">
              <label>Existing Floor Plans:</label>
              <ul className="file-list">
                {existingFlatPlans.map((file, index) => (
                  <li key={index}>
                    <a 
                      href={`${baseUrl}${file}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {file.split('/').pop()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="flatPlans">Floor Plans</label>
            <input
              type="file"
              id="flatPlans"
              name="flatPlans"
              onChange={handleFlatPlanFileChange}
              multiple
            />
            {selectedFlatPlans.length > 0 && (
              <div className="selected-files">
                <p>Selected files: {selectedFlatPlans.map(file => file.name).join(', ')}</p>
              </div>
            )}
          </div>
          
          {/* Show existing images if editing */}
          {apartmentToEdit && existingImages.length > 0 && (
            <div className="form-group">
              <label>Existing Images:</label>
              <div className="image-preview">
                {existingImages.map((img, index) => (
                  <div key={index} className="preview-image">
                    <img 
                      src={`${baseUrl}${img}`} 
                      alt={`Apartment image ${index + 1}`} 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="images">Apartment Images</label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleImageFileChange}
              multiple
              accept="image/*"
            />
            {selectedImages.length > 0 && (
              <div className="selected-files">
                <p>Selected images: {selectedImages.map(file => file.name).join(', ')}</p>
              </div>
            )}
          </div>
          
          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="save-button"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : (apartmentToEdit ? 'Update Apartment' : 'Save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApartmentCreationModal;