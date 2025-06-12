import React from 'react';
import { Shield } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl shadow-lg animate-pulse">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading AcademicIP...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;