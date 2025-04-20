import React, { useState, useEffect, useRef } from 'react';
import { createEmployee, updateEmployee, uploadEmployeeImage, deleteEmployee } from '../../services/EmployeeService';
import { Employee } from '../../types/ProjectType';
import { getImageUrl, handleImageError } from '../../utils/ImageUtils';
import './EmployeeCreationModal.css';

interface EmployeeCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmployeeCreated: () => void;
  employeeToEdit: Employee | null;
}

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const PhotoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const EmployeeCreationModal: React.FC<EmployeeCreationModalProps> = ({
  isOpen,
  onClose,
  onEmployeeCreated,
  employeeToEdit
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [title, setTitle] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // For delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // File input reference
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validation states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Populate form fields when editing an existing employee
  useEffect(() => {
    if (employeeToEdit) {
      setName(employeeToEdit.name || '');
      setEmail(employeeToEdit.email || '');
      setPhoneNumber(employeeToEdit.phoneNumber || '');
      setLinkedIn(employeeToEdit.linkedIn || '');
      setTitle(employeeToEdit.title || '');
      
      // Handle image path from backend
      if (employeeToEdit.image) {
        setImageSrc(employeeToEdit.image);
        // Create proper URL for preview
        setPreviewUrl(getImageUrl(employeeToEdit.image) || null);
        console.log("Set employee image:", employeeToEdit.image);
      } else {
        setImageSrc('');
        setPreviewUrl(null);
      }
    } else {
      // Reset form for new employee creation
      setName('');
      setEmail('');
      setPhoneNumber('');
      setLinkedIn('');
      setTitle('');
      setImageSrc('');
      setPreviewUrl(null);
      setSelectedFiles([]);
    }
    // Reset states
    setErrors({});
    setShowDeleteConfirm(false);
  }, [employeeToEdit, isOpen]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
      
      // Create preview for first file
      const url = URL.createObjectURL(files[0]);
      setPreviewUrl(url);
      
      // Clear any previous file errors
      if (errors.file) {
        const newErrors = { ...errors };
        delete newErrors.file;
        setErrors(newErrors);
      }
      
      console.log("Image preview URL created:", url);
    }
  };
  
  // Clean up any object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Trigger file input click
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Validate the form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const employeeData = {
        name,
        email,
        phoneNumber,
        linkedIn,
        title,
        image: imageSrc
      };
      
      let savedEmployee: Employee;
      
      if (employeeToEdit) {
        // Update existing employee
        savedEmployee = await updateEmployee(employeeToEdit.id, employeeData);
      } else {
        // Create new employee
        savedEmployee = await createEmployee(employeeData);
      }
      
      // Upload image if files are selected
      if (selectedFiles.length > 0) {
        console.log("Uploading image for employee ID:", savedEmployee.id);
        try {
          const updatedEmployee = await uploadEmployeeImage(savedEmployee.id, selectedFiles);
          console.log("Image uploaded successfully:", updatedEmployee);
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError);
          // Continue with the form submission even if image upload fails
        }
      }
      
      onEmployeeCreated();
    } catch (error) {
      console.error('Error saving employee:', error);
      setErrors({ 
        submit: 'Failed to save employee. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle employee deletion
  const handleDelete = async () => {
    if (!employeeToEdit) return;
    
    setIsDeleting(true);
    
    try {
      await deleteEmployee(employeeToEdit.id);
      onEmployeeCreated(); // Refresh the employee list
    } catch (error) {
      console.error('Error deleting employee:', error);
      setErrors({
        submit: 'Failed to delete employee. Please try again.'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{employeeToEdit ? 'Edit Employee' : 'Create New Employee'}</h2>
          <button 
            className="close-button" 
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {errors.submit && (
              <div className="error-message" role="alert">
                {errors.submit}
              </div>
            )}
            
            <div className="image-upload-section">
              <div className="upload-preview">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Employee preview" 
                    className="employee-image-preview" 
                    onError={(e) => handleImageError(e, imageSrc, (newUrl) => {
                      if (newUrl) {
                        setPreviewUrl(newUrl);
                      } else {
                        setPreviewUrl(null);
                      }
                    })}
                  />
                ) : (
                  <div className="image-placeholder">
                    <PhotoIcon />
                    <span>No image</span>
                  </div>
                )}
              </div>
              
              <div className="upload-controls">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <button 
                  type="button" 
                  className="upload-button" 
                  onClick={handleUploadClick}
                >
                  <UploadIcon />
                  Upload Image
                </button>
                <p className="upload-help-text">
                  Upload a professional photo of the employee (JPG, PNG)
                </p>
                {errors.file && (
                  <div className="error-text">{errors.file}</div>
                )}
                {previewUrl && selectedFiles.length > 0 && (
                  <p className="upload-status">New image ready to upload</p>
                )}
                {previewUrl && selectedFiles.length === 0 && imageSrc && (
                  <p className="upload-info">Current image path: {imageSrc}</p>
                )}
              </div>
            </div>
            
            <div className="form-divider"></div>
            
            <div className="form-group">
              <label htmlFor="name">Full Name*</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? 'input-error' : ''}
              />
              {errors.name && <div className="error-text">{errors.name}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="linkedIn">LinkedIn URL</label>
              <input
                id="linkedIn"
                type="text"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="title">Job Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Developer"
              />
            </div>
            
            {employeeToEdit && (
              <div className="danger-zone">
                <h3>Danger Zone</h3>
                {!showDeleteConfirm ? (
                  <button 
                    type="button" 
                    className="delete-button" 
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    <TrashIcon />
                    Delete Employee
                  </button>
                ) : (
                  <div className="delete-confirmation">
                    <p>Are you sure you want to delete this employee? This action cannot be undone.</p>
                    <div className="delete-actions">
                      <button 
                        type="button" 
                        className="cancel-delete-button" 
                        onClick={() => setShowDeleteConfirm(false)}
                        disabled={isDeleting}
                      >
                        Cancel
                      </button>
                      <button 
                        type="button" 
                        className="confirm-delete-button" 
                        onClick={handleDelete}
                        disabled={isDeleting}
                      >
                        {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="modal-footer">
            <button 
              type="button" 
              className="button-secondary" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="button-primary" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : employeeToEdit ? 'Update Employee' : 'Create Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeCreationModal;