import { Project, Apartment } from "../types/ProjectType";

// ----- Project-related functions -----

// Get all projects
export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch('http://localhost:8080/api/projects/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching projects: ${response.statusText}`);
    }

    const projects: Project[] = await response.json();
    return projects;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw error;
  }
};

// Create project
export const createProject = async (projectData: Omit<Project, 'id'>): Promise<Project> => {
  try {
    const response = await fetch('http://localhost:8080/api/projects/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error(`Error creating project: ${response.statusText}`);
    }

    const createdProject: Project = await response.json();
    return createdProject;
  } catch (error) {
    console.error('Failed to create project:', error);
    throw error;
  }
};

// Update project
export const updateProject = async (projectId: number, projectData: Partial<Project>): Promise<Project> => {
  try {
    const response = await fetch(`http://localhost:8080/api/projects/${projectId}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error(`Error updating project: ${response.statusText}`);
    }

    const updatedProject: Project = await response.json();
    return updatedProject;
  } catch (error) {
    console.error('Failed to update project:', error);
    throw error;
  }
};

// Upload project files
export const uploadProjectFiles = async (projectId: number, files: File[]): Promise<Project> => {
  try {
    const formData = new FormData();
    
    files.forEach(file => {
      formData.append('files', file);
    });

    const response = await fetch(`http://localhost:8080/api/projects/${projectId}/uploadFiles`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error uploading files: ${response.statusText}`);
    }

    const updatedProject: Project = await response.json();
    return updatedProject;
  } catch (error) {
    console.error('Failed to upload files:', error);
    throw error;
  }
};

// Upload project images
export const uploadProjectImages = async (projectId: number, images: File[]): Promise<Project> => {
  try {
    const formData = new FormData();
    
    images.forEach(image => {
      formData.append('files', image);
    });

    const response = await fetch(`http://localhost:8080/api/projects/${projectId}/uploadImages`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error uploading images: ${response.statusText}`);
    }

    const updatedProject: Project = await response.json();
    return updatedProject;
  } catch (error) {
    console.error('Failed to upload images:', error);
    throw error;
  }
};

// Get project by ID
export const getProjectById = async (projectId: number): Promise<Project> => {
  try {
    const response = await fetch(`http://localhost:8080/api/projects/${projectId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching project: ${response.statusText}`);
    }

    const project: Project = await response.json();
    return project;
  } catch (error) {
    console.error(`Failed to fetch project with ID ${projectId}:`, error);
    throw error;
  }
};

// ----- Apartment-related functions -----

// Get all apartments
export const getAllApartments = async (): Promise<Apartment[]> => {
  try {
    const response = await fetch('http://localhost:8080/api/apartments/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching apartments: ${response.statusText}`);
    }

    const apartments: Apartment[] = await response.json();
    return apartments;
  } catch (error) {
    console.error('Failed to fetch apartments:', error);
    throw error;
  }
};

// Create apartment
export const createApartment = async (apartmentData: Omit<Apartment, 'id'>): Promise<Apartment> => {
  try {
    const response = await fetch('http://localhost:8080/api/apartments/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apartmentData),
    });

    if (!response.ok) {
      throw new Error(`Error creating apartment: ${response.statusText}`);
    }

    const createdApartment: Apartment = await response.json();
    return createdApartment;
  } catch (error) {
    console.error('Failed to create apartment:', error);
    throw error;
  }
};

// Update apartment - Removed duplicate declaration
export const updateApartment = async (apartmentId: number, apartmentData: Partial<Apartment>): Promise<Apartment> => {
  try {
    const response = await fetch(`http://localhost:8080/api/apartments/${apartmentId}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apartmentData),
    });

    if (!response.ok) {
      throw new Error(`Error updating apartment: ${response.statusText}`);
    }

    const updatedApartment: Apartment = await response.json();
    return updatedApartment;
  } catch (error) {
    console.error('Failed to update apartment:', error);
    throw error;
  }
};

// Upload apartment files (flat plans)
export const uploadApartmentFiles = async (apartmentId: number, files: File[]): Promise<Apartment> => {
  try {
    const formData = new FormData();
    
    files.forEach(file => {
      formData.append('files', file);
    });

    const response = await fetch(`http://localhost:8080/api/apartments/${apartmentId}/uploadFiles`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error uploading files: ${response.statusText}`);
    }

    const updatedApartment: Apartment = await response.json();
    return updatedApartment;
  } catch (error) {
    console.error('Failed to upload files:', error);
    throw error;
  }
};

// Upload apartment images
export const uploadApartmentImages = async (apartmentId: number, images: File[]): Promise<Apartment> => {
  try {
    const formData = new FormData();
    
    images.forEach(image => {
      formData.append('files', image);
    });

    const response = await fetch(`http://localhost:8080/api/apartments/${apartmentId}/uploadImages`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error uploading images: ${response.statusText}`);
    }

    const updatedApartment: Apartment = await response.json();
    return updatedApartment;
  } catch (error) {
    console.error('Failed to upload images:', error);
    throw error;
  }
};

// Link apartment to project
export const linkApartmentToProject = async (apartmentId: number, projectId: number): Promise<Apartment> => {
  try {
    const response = await fetch(`http://localhost:8080/api/apartments/${apartmentId}/project?projectId=${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error linking apartment to project: ${response.statusText}`);
    }

    const updatedApartment: Apartment = await response.json();
    return updatedApartment;
  } catch (error) {
    console.error('Failed to link apartment to project:', error);
    throw error;
  }
};

// Get apartment by ID
export const getApartmentById = async (apartmentId: number): Promise<Apartment> => {
  try {
    const response = await fetch(`http://localhost:8080/api/apartments/${apartmentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching apartment: ${response.statusText}`);
    }

    const apartment: Apartment = await response.json();
    return apartment;
  } catch (error) {
    console.error(`Failed to fetch apartment with ID ${apartmentId}:`, error);
    throw error;
  }
};

// Delete apartment
export const deleteApartment = async (apartmentId: number): Promise<boolean> => {
  try {
    const response = await fetch(`http://localhost:8080/api/apartments/${apartmentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error deleting apartment: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Failed to delete apartment:', error);
    throw error;
  }
};