import React from 'react';
import { Shield, BookOpen, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AcademicIP</h1>
              <p className="text-xs text-gray-500">Blockchain Research Protection</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <BookOpen className="w-4 h-4" />
              <span>Research Portal</span>
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Analytics</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Documentation</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Connected</span>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <span>Account</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;