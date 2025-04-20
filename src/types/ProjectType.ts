export interface Project {
    id: number;
    name: string;
    location?:string;
    latitude?:number;
    longitude?:number;
    status:string;
    description?: string;
    image?:string[];
    apartments?:Apartment[];
    specs?:string[];
  }

  export interface Apartment {
    id: number;
    name: string;
    status:string;
    description?: string;
    image?:string[];
    flatPlan?:string[];
    projectId?:number;
  }

  export interface Employee {
    id: number;
    name: string;
    email:string;
    phoneNumber?: string;
    linkedIn?:string;
    title?:string;
    image?: string;

  }