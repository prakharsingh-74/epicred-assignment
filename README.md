# JobHub - Job Application Dashboard

A modern, responsive job application dashboard built with React, TypeScript, and Tailwind CSS. This application allows users to browse job listings, view detailed job information, submit applications, and track their application status.

## Features

- 🔍 Interactive job search with filtering capabilities
- 📋 Detailed job listings with company information
- 📝 User-friendly application form with validation
- 📊 Application tracking dashboard
- 📱 Fully responsive design for all devices
- 💾 Persistent storage for application data

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- React Router
- Context API for state management
- Lucide React for icons

## Project Structure

```
src/
├── components/      # Reusable UI components
├── context/        # React Context for state management
├── data/           # Mock API and data
├── pages/          # Page components
├── types/          # TypeScript interfaces
└── utils/          # Utility functions
```

## Key Components

- `JobList`: Displays all available job listings with search and filter
- `JobDetail`: Shows comprehensive information about a specific job
- `JobApplicationForm`: Handles the job application process
- `AppliedJobs`: Tracks and displays user's job applications

## Features in Detail

### Job Listings
- Search jobs by title, company, or category
- Filter by job type, category, and location
- Clean card layout with essential job information

### Job Details
- Comprehensive job description
- Company information
- Salary range and location details
- Requirements and responsibilities
- Easy application process

### Application Management
- Track application status
- View submission history
- Access applied job details

### User Interface
- Modern, clean design
- Responsive layout
- Intuitive navigation
- Loading states and error handling

## Development

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes.
