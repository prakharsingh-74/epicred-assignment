export interface Job {
  id: string;
  title: string;
  company: {
    name: string;
    logo: string;
    location: string;
  };
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  category: string;
  minSalary: number;
  maxSalary: number;
  posted: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  resume: string;
  coverLetter?: string;
  status: 'Pending' | 'Reviewed' | 'Rejected' | 'Accepted';
  appliedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  applications: JobApplication[];
}