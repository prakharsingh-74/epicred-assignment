import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import JobCard from './JobCard';
import { useJobContext } from '../context/JobContext';

const JobList: React.FC = () => {
  const { jobs, loading, error } = useJobContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-400 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 text-red-600 rounded-lg">
        <p>{error}</p>
        <button className="mt-4 btn btn-outline" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">Find Your Dream Job</h1>
        <p className="text-neutral-600">Discover job opportunities that match your skills and interests</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={20} className="text-neutral-500" />
          </div>
          <input
            type="text"
            placeholder="Search jobs, companies, or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="btn btn-outline flex items-center gap-2"
        >
          <SlidersHorizontal size={18} />
          <span>Filters</span>
        </button>
      </div>

      {/* Filter Options - Simplified for this implementation */}
      {isFilterOpen && (
        <div className="mb-8 p-4 bg-white border border-neutral-200 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Job Type
              </label>
              <select className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400">
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Category
              </label>
              <select className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400">
                <option value="">All Categories</option>
                <option value="Software Development">Software Development</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Location
              </label>
              <select className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400">
                <option value="">All Locations</option>
                <option value="Remote">Remote</option>
                <option value="San Francisco">San Francisco</option>
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      <p className="text-neutral-600 mb-6">
        Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
      </p>

      {/* Job Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="text-center p-8 bg-neutral-50 rounded-lg">
            <p className="text-neutral-600">No jobs match your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;