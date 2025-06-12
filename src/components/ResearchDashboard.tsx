import React from 'react';
import { ResearchPaper } from '../types/research';
import { Calendar, Users, Building, ExternalLink, Shield } from 'lucide-react';

interface ResearchDashboardProps {
  papers: ResearchPaper[];
}

const ResearchDashboard: React.FC<ResearchDashboardProps> = ({ papers }) => {
  const getStatusColor = (status: ResearchPaper['status']) => {
    switch (status) {
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'tokenized': return 'bg-blue-100 text-blue-800';
      case 'verified': return 'bg-green-100 text-green-800';
      case 'flagged': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: ResearchPaper['status']) => {
    switch (status) {
      case 'verified': return <Shield className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Research Portfolio</h2>
        <div className="text-sm text-gray-600">
          {papers.length} paper{papers.length !== 1 ? 's' : ''} protected
        </div>
      </div>

      <div className="grid gap-6">
        {papers.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No research papers uploaded yet.</p>
            <p className="text-sm text-gray-500 mt-1">Upload your first paper to get started with IP protection.</p>
          </div>
        ) : (
          papers.map((paper) => (
            <div key={paper.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{paper.title}</h3>
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(paper.status)}`}>
                      {getStatusIcon(paper.status)}
                      <span>{paper.status}</span>
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{paper.authors.join(', ')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4" />
                      <span>{paper.institution}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{paper.uploadDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Tokenized Sections</h4>
                    <div className="flex flex-wrap gap-2">
                      {paper.sections.map((section) => (
                        <span
                          key={section.id}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {section.title}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Overall Similarity: <span className="font-semibold">{paper.overallSimilarity}%</span></span>
                    <a
                      href={`#tx-${paper.blockchainTxId}`}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View Transaction</span>
                    </a>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Blockchain Details</h5>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">TX ID:</span>
                        <p className="font-mono text-xs mt-1 break-all">{paper.blockchainTxId}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">IPFS Hash:</span>
                        <p className="font-mono text-xs mt-1 break-all">{paper.ipfsHash}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ResearchDashboard;