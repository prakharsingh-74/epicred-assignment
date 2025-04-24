import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Job, JobApplication } from '../types';
import { api } from '../data/mockApi';

interface JobContextType {
  jobs: Job[];
  appliedJobs: JobApplication[];
  loading: boolean;
  error: string | null;
  applyForJob: (application: Omit<JobApplication, 'id' | 'status' | 'appliedAt'>) => Promise<JobApplication>;
  refreshApplications: () => Promise<void>;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const jobsData = await api.getJobs();
      setJobs(jobsData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again later.');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const applications = await api.getApplications();
      setAppliedJobs(applications);
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const applyForJob = async (application: Omit<JobApplication, 'id' | 'status' | 'appliedAt'>) => {
    const newApplication = await api.submitApplication(application);
    await fetchApplications(); // Refresh the applications list
    return newApplication;
  };

  const refreshApplications = async () => {
    await fetchApplications();
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        appliedJobs,
        loading,
        error,
        applyForJob,
        refreshApplications,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
};