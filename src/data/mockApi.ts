import { Job, JobApplication } from '../types';
import { JOBS } from './jobs';

// Simulating local storage for applied jobs
const STORAGE_KEY = 'job_applications';

// Helper to get applications from local storage
const getStoredApplications = (): JobApplication[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Helper to store applications to local storage
const storeApplications = (applications: JobApplication[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
};

export const api = {
  // Get all jobs
  getJobs: (): Promise<Job[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(JOBS);
      }, 500);
    });
  },

  // Get a specific job by ID
  getJob: (id: string): Promise<Job | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const job = JOBS.find((job) => job.id === id);
        resolve(job || null);
      }, 300);
    });
  },

  // Get user's job applications
  getApplications: (): Promise<JobApplication[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getStoredApplications());
      }, 300);
    });
  },

  // Submit a job application
  submitApplication: (application: Omit<JobApplication, 'id' | 'status' | 'appliedAt'>): Promise<JobApplication> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const applications = getStoredApplications();
        
        // Create new application with generated data
        const newApplication: JobApplication = {
          ...application,
          id: Date.now().toString(),
          status: 'Pending',
          appliedAt: new Date().toISOString(),
        };
        
        // Add to storage
        applications.push(newApplication);
        storeApplications(applications);        
        resolve(newApplication);
      }, 700);
    });
  },
};