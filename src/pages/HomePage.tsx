import React from 'react';
import JobList from '../components/JobList';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <JobList />
    </div>
  );
};

export default HomePage;