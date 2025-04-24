import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Briefcase as BriefcaseBusiness, ChevronLeft } from 'lucide-react';
import { api } from '../data/mockApi';
import { Job } from '../types';
import { formatCurrency, formatDateFromNow } from '../utils/formatters';
import JobApplicationForm from './JobApplicationForm';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const jobData = await api.getJob(id);
        
        if (!jobData) {
          setError('Job not found');
          return;
        }
        
        setJob(jobData);
        setError(null);
      } catch (err) {
        setError('Failed to load job details');
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-400 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="text-center p-8 bg-red-50 text-red-600 rounded-lg">
        <p>{error || 'Job not found'}</p>
        <button className="mt-4 btn btn-outline" onClick={() => navigate('/')}>
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1 text-neutral-600 hover:text-primary-500 mb-6 transition-colors"
      >
        <ChevronLeft size={18} />
        <span>Back to job listings</span>
      </button>

      <div className="card mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Company Logo */}
          <div className="h-16 w-16 md:h-20 md:w-20 rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src={job.company.logo} 
              alt={`${job.company.name} logo`} 
              className="h-full w-full object-cover"
            />
          </div>

          {/* Job Info */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">{job.title}</h1>
            <p className="text-lg text-neutral-700 font-medium mb-4">{job.company.name}</p>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="badge bg-primary-50 text-primary-600">{job.type}</span>
              <span className="badge bg-neutral-100 text-neutral-700">{job.category}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-neutral-500" />
                <span>{job.company.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={18} className="text-neutral-500" />
                <span>{formatCurrency(job.minSalary)} - {formatCurrency(job.maxSalary)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-neutral-500" />
                <span>Posted {formatDateFromNow(job.posted)}</span>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="w-full md:w-auto">
            <button
              onClick={() => setShowApplicationForm(true)}
              className="w-full md:w-auto btn btn-primary flex items-center gap-2"
            >
              <BriefcaseBusiness size={18} />
              <span>Apply Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card mb-8">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Job Description</h2>
            <p className="text-neutral-700 mb-6 leading-relaxed">{job.description}</p>
            
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Requirements</h3>
            <ul className="list-disc pl-5 mb-6 text-neutral-700 space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
            
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Responsibilities</h3>
            <ul className="list-disc pl-5 text-neutral-700 space-y-2">
              {job.responsibilities.map((resp, index) => (
                <li key={index}>{resp}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Company Info - Simplified */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">About the Company</h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-lg overflow-hidden">
                <img 
                  src={job.company.logo} 
                  alt={`${job.company.name} logo`} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-neutral-800">{job.company.name}</p>
                <p className="text-sm text-neutral-600">{job.company.location}</p>
              </div>
            </div>
            <p className="text-neutral-700">
              {job.company.name} is a leading company in the {job.category} industry, known for innovation and excellence.
            </p>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-neutral-900">Apply for {job.title}</h2>
                <button onClick={() => setShowApplicationForm(false)} className="text-neutral-500 hover:text-neutral-800">
                  <X size={24} />
                </button>
              </div>
              <JobApplicationForm 
                job={job} 
                onClose={() => setShowApplicationForm(false)} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;