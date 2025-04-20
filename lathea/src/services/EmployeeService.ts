import { Employee } from "../types/ProjectType";

// Get all employees
export const getAllEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await fetch('http://localhost:8080/api/employees/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching employees: ${response.statusText}`);
    }

    const employees: Employee[] = await response.json();
    return employees;
  } catch (error) {
    console.error('Failed to fetch employees:', error);
    throw error;
  }
};

// Create a new employee
export const createEmployee = async (employeeData: Omit<Employee, 'id'>): Promise<Employee> => {
  try {
    const response = await fetch('http://localhost:8080/api/employees/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      throw new Error(`Error creating employee: ${response.statusText}`);
    }

    const createdEmployee: Employee = await response.json();
    return createdEmployee;
  } catch (error) {
    console.error('Failed to create employee:', error);
    throw error;
  }
};

// Update an existing employee using JSON payload
export const updateEmployee = async (employeeId: number, employeeData: Partial<Employee>): Promise<Employee> => {
  try {
    const response = await fetch(`http://localhost:8080/api/employees/${employeeId}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      throw new Error(`Error updating employee: ${response.statusText}`);
    }

    const updatedEmployee: Employee = await response.json();
    return updatedEmployee;
  } catch (error) {
    console.error('Failed to update employee:', error);
    throw error;
  }
};

// Upload employee image(s)
export const uploadEmployeeImage = async (employeeId: number, files: File[]): Promise<Employee> => {
  try {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    const response = await fetch(`http://localhost:8080/api/employees/${employeeId}/uploadImage`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error uploading image: ${response.statusText}`);
    }

    const updatedEmployee: Employee = await response.json();
    return updatedEmployee;
  } catch (error) {
    console.error('Failed to upload employee image:', error);
    throw error;
  }
};

// Delete employee
export const deleteEmployee = async (employeeId: number): Promise<boolean> => {
  try {
    const response = await fetch(`http://localhost:8080/api/employees/${employeeId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error deleting employee: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Failed to delete employee:', error);
    throw error;
  }
};
