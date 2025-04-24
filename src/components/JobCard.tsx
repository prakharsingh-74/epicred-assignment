import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import { Job } from '../types';
import { formatCurrency, formatDateFromNow } from '../utils/formatters';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="card border border-neutral-200 hover:border-primary-400 transition-all duration-200">
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={job.company.logo} 
            alt={`${job.company.name} logo`} 
            className="h-full w-full object-cover"
          />
        </div>

        {/* Job Info */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-neutral-900 mb-1">{job.title}</h3>
          <p className="text-neutral-600 font-medium mb-3">{job.company.name}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge bg-primary-50 text-primary-600">{job.type}</span>
            <span className="badge bg-neutral-100 text-neutral-700">{job.category}</span>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
            <div className="flex items-center gap-1">
              <MapPin size={16} className="text-neutral-500" />
              <span>{job.company.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign size={16} className="text-neutral-500" />
              <span>{formatCurrency(job.minSalary)} - {formatCurrency(job.maxSalary)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} className="text-neutral-500" />
              <span>Posted {formatDateFromNow(job.posted)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-neutral-200 flex justify-end">
        <Link 
          to={`/job/${job.id}`} 
          className="btn btn-primary"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;