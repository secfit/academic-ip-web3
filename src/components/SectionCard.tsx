import React from 'react';
import { ResearchSection } from '../types/research';
import { Hash, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface SectionCardProps {
  section: ResearchSection;
}

const SectionCard: React.FC<SectionCardProps> = ({ section }) => {
  const getSimilarityColor = (similarity?: number) => {
    if (!similarity) return 'text-gray-500';
    if (similarity > 70) return 'text-red-600';
    if (similarity > 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getSimilarityIcon = (similarity?: number) => {
    if (!similarity) return <CheckCircle className="w-4 h-4 text-gray-500" />;
    if (similarity > 70) return <AlertTriangle className="w-4 h-4 text-red-600" />;
    if (similarity > 40) return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    return <CheckCircle className="w-4 h-4 text-green-600" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{section.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Hash className="w-4 h-4" />
              <span className="font-mono">{section.tokenId}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{section.timestamp.toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          {getSimilarityIcon(section.similarity)}
          <span className={getSimilarityColor(section.similarity)}>
            {section.similarity ? `${section.similarity}% similar` : 'Unique'}
          </span>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
          {section.content.substring(0, 200)}...
        </p>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          Hash: <span className="font-mono">{section.hash}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-600">On-chain</span>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;