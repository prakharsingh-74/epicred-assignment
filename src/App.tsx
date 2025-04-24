import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import JobDetailPage from './pages/JobDetailPage';
import AppliedJobsPage from './pages/AppliedJobsPage';
import { JobProvider } from './context/JobContext';

function App() {
  return (
    <JobProvider>
      <Router>
        <div className="min-h-screen bg-neutral-50 flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/job/:id" element={<JobDetailPage />} />
              <Route path="/applied" element={<AppliedJobsPage />} />
            </Routes>
          </main>
          <footer className="bg-white py-6 border-t border-neutral-200">
            <div className="container mx-auto px-4 text-center text-neutral-600">
              <p>&copy; {new Date().getFullYear()} JobHub. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </JobProvider>
  );
}

export default App;