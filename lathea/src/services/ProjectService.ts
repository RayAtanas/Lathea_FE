import {Project} from "../types/ProjectType";

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


export const getProjectById = async (id: number): Promise<Project> => {
  try {
    const response = await fetch(`http://localhost:8080/api/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching project with id ${id}: ${response.statusText}`);
    }

    const project: Project = await response.json();
    return project;
  } catch (error) {
    console.error('Failed to fetch project by id:', error);
    throw error;
  }
};
