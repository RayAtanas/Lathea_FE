export interface Project {
    id: number;
    name: string;
    location?:string;
    latitude?:number;
    status:string;
    description?: string;
    image?:string[];
    specs?:Blob[];
  }