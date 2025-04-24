import React, { useEffect, useState } from 'react';
import { useJobContext } from '../context/JobContext';
import AppliedJobCard from './AppliedJobCard';
import { Briefcase } from 'lucide-react';
import { Job } from '../types';
import { api } from '../data/mockApi';
import { Link } from 'react-router-dom';

const AppliedJobs: React.FC = () => {
  const { appliedJobs, refreshApplications } = useJobContext();
  const [jobDetails, setJobDetails] = useState<Record<string, Job | null>>({});
  const [loading, setLoading] = useState(true);

  // Fetch job details for all applied jobs
  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      const details: Record<string, Job | null> = {};
      
      // Using Promise.all to fetch all job details in parallel
      await Promise.all(
        appliedJobs.map(async (application) => {
          try {
            const job = await api.getJob(application.jobId);
            details[application.jobId] = job;
          } catch (error) {
            console.error(`Failed to fetch job ${application.jobId}:`, error);
            details[application.jobId] = null;
          }
        })
      );
      
      setJobDetails(details);
      setLoading(false);
    };

    if (appliedJobs.length > 0) {
      fetchJobDetails();
    } else {
      setLoading(false);
    }
  }, [appliedJobs]);

  // Refresh applications when component mounts
  useEffect(() => {
    refreshApplications();
  }, [refreshApplications]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-400 border-t-transparent"></div>
      </div>
    );
  }

  if (appliedJobs.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="flex justify-center mb-4">
          <Briefcase size={64} className="text-neutral-300" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">No applications yet</h2>
        <p className="text-neutral-600 mb-6">You haven't applied to any jobs. Start your job search now!</p>
        <Link to="/" className="btn btn-primary">
          Browse Jobs
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">My Applications</h1>
        <p className="text-neutral-600">Track the status of your job applications</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {appliedJobs.map((application) => (
          <AppliedJobCard 
            key={application.id} 
            application={application} 
            job={jobDetails[application.jobId]}
          />
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;