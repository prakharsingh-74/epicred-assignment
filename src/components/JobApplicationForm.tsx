import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Job } from '../types';
import { useJobContext } from '../context/JobContext';

interface JobApplicationFormProps {
  job: Job;
  onClose: () => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ job, onClose }) => {
  const navigate = useNavigate();
  const { applyForJob } = useJobContext();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.resume.trim()) {
      newErrors.resume = 'Resume link is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await applyForJob({
        jobId: job.id,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        resume: formData.resume,
        coverLetter: formData.coverLetter,
      });
      
      setSubmitSuccess(true);
      
      // Redirect after successful submission
      setTimeout(() => {
        onClose();
        navigate('/applied');
      }, 2000);
    } catch (error) {
      console.error('Error submitting application:', error);
      setErrors({ 
        form: 'Failed to submit application. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      {submitSuccess ? (
        <div className="text-center p-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-success-100 text-success-600 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-neutral-900 mb-2">Application Submitted!</h3>
          <p className="text-neutral-600 mb-4">
            Your application has been successfully submitted. We'll redirect you to your applications page.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.form && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg mb-4">
              {errors.form}
            </div>
          )}
      
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full p-3 border ${errors.fullName ? 'border-red-500' : 'border-neutral-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400`}
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
          </div>
      
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-neutral-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
      
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-neutral-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400`}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>
      
          <div>
            <label htmlFor="resume" className="block text-sm font-medium text-neutral-700 mb-1">
              Resume Link *
            </label>
            <input
              type="text"
              id="resume"
              name="resume"
              placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
              value={formData.resume}
              onChange={handleChange}
              className={`w-full p-3 border ${errors.resume ? 'border-red-500' : 'border-neutral-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400`}
            />
            {errors.resume && <p className="mt-1 text-sm text-red-600">{errors.resume}</p>}
          </div>
      
          <div>
            <label htmlFor="coverLetter" className="block text-sm font-medium text-neutral-700 mb-1">
              Cover Letter (Optional)
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              rows={4}
              value={formData.coverLetter}
              onChange={handleChange}
              className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
              placeholder="Tell us why you're a great fit for this position"
            ></textarea>
          </div>
      
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : 'Submit Application'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default JobApplicationForm;