import React from 'react';
import { Link } from 'react-router-dom';
import { Job, JobApplication } from '../types';
import { formatDate } from '../utils/formatters';

interface AppliedJobCardProps {
  application: JobApplication;
  job: Job | null;
}

const AppliedJobCard: React.FC<AppliedJobCardProps> = ({ application, job }) => {
  if (!job) {
    return (
      <div className="card animate-pulse">
        <div className="h-12 w-full bg-neutral-200 rounded mb-4"></div>
        <div className="h-6 w-1/2 bg-neutral-200 rounded mb-2"></div>
        <div className="h-4 w-3/4 bg-neutral-200 rounded"></div>
      </div>
    );
  }

  // Status badge colors
  const getStatusBadge = () => {
    switch (application.status) {
      case 'Pending':
        return <span className="badge bg-warning-50 text-warning-600">Pending Review</span>;
      case 'Reviewed':
        return <span className="badge bg-primary-50 text-primary-600">Reviewed</span>;
      case 'Accepted':
        return <span className="badge bg-success-50 text-success-600">Accepted</span>;
      case 'Rejected':
        return <span className="badge bg-red-50 text-red-600">Rejected</span>;
      default:
        return <span className="badge bg-neutral-100 text-neutral-600">{application.status}</span>;
    }
  };

  return (
    <div className="card border border-neutral-200">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={job.company.logo} 
            alt={`${job.company.name} logo`} 
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-neutral-900 mb-1">{job.title}</h3>
          <p className="text-neutral-600 font-medium mb-3">{job.company.name}</p>
          
          <div className="flex flex-wrap gap-3 mb-4">
            {getStatusBadge()}
            <span className="badge bg-neutral-100 text-neutral-700">
              Applied on {formatDate(application.appliedAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-neutral-200 flex justify-end">
        <Link 
          to={`/job/${job.id}`} 
          className="btn btn-outline mr-2"
        >
          View Job
        </Link>
        <button 
          className="btn btn-primary"
          disabled
        >
          Application Details
        </button>
      </div>
    </div>
  );
};

export default AppliedJobCard;