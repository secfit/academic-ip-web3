import React, { useState } from 'react';
import { useResearchProcessor } from '../hooks/useResearchProcessor';
import UploadZone from '../components/UploadZone';
import SectionCard from '../components/SectionCard';
import { ResearchPaper } from '../types/research';
import { CheckCircle, AlertTriangle, FileText, Hash } from 'lucide-react';

const ResearchUploadPage: React.FC = () => {
  const { isProcessing, processResearch } = useResearchProcessor();
  const [uploadedPaper, setUploadedPaper] = useState<ResearchPaper | null>(null);
  const [uploadStep, setUploadStep] = useState<'upload' | 'processing' | 'complete'>('upload');

  const handleFileUpload = async (content: string, fileName: string) => {
    try {
      setUploadStep('processing');
      const newPaper = await processResearch(content, fileName);
      setUploadedPaper(newPaper);
      setUploadStep('complete');
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStep('upload');
    }
  };

  const handleNewUpload = () => {
    setUploadedPaper(null);
    setUploadStep('upload');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Upload Research Paper
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Protect your academic research by generating blockchain tokens for each section. 
          Our system will analyze your work and provide similarity detection.
        </p>
      </div>

      {/* Upload Steps */}
      <div className="flex items-center justify-center space-x-8 mb-8">
        <div className={`flex items-center space-x-2 ${
          uploadStep === 'upload' ? 'text-blue-600' : 
          uploadStep === 'processing' || uploadStep === 'complete' ? 'text-green-600' : 'text-gray-400'
        }`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            uploadStep === 'upload' ? 'bg-blue-100 border-2 border-blue-600' :
            uploadStep === 'processing' || uploadStep === 'complete' ? 'bg-green-100' : 'bg-gray-100'
          }`}>
            {uploadStep === 'processing' || uploadStep === 'complete' ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <span className="text-sm font-medium">1</span>
            )}
          </div>
          <span className="font-medium">Upload</span>
        </div>

        <div className={`w-16 h-0.5 ${
          uploadStep === 'processing' || uploadStep === 'complete' ? 'bg-green-600' : 'bg-gray-300'
        }`} />

        <div className={`flex items-center space-x-2 ${
          uploadStep === 'processing' ? 'text-blue-600' : 
          uploadStep === 'complete' ? 'text-green-600' : 'text-gray-400'
        }`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            uploadStep === 'processing' ? 'bg-blue-100 border-2 border-blue-600' :
            uploadStep === 'complete' ? 'bg-green-100' : 'bg-gray-100'
          }`}>
            {uploadStep === 'complete' ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : uploadStep === 'processing' ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            ) : (
              <span className="text-sm font-medium">2</span>
            )}
          </div>
          <span className="font-medium">Process</span>
        </div>

        <div className={`w-16 h-0.5 ${
          uploadStep === 'complete' ? 'bg-green-600' : 'bg-gray-300'
        }`} />

        <div className={`flex items-center space-x-2 ${
          uploadStep === 'complete' ? 'text-green-600' : 'text-gray-400'
        }`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            uploadStep === 'complete' ? 'bg-green-100' : 'bg-gray-100'
          }`}>
            {uploadStep === 'complete' ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <span className="text-sm font-medium">3</span>
            )}
          </div>
          <span className="font-medium">Complete</span>
        </div>
      </div>

      {/* Upload Zone */}
      {uploadStep === 'upload' && (
        <UploadZone onFileUpload={handleFileUpload} isProcessing={isProcessing} />
      )}

      {/* Processing State */}
      {uploadStep === 'processing' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Your Research</h3>
          <p className="text-gray-600 mb-4">
            We're analyzing your paper, creating blockchain tokens, and checking for similarities...
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Progress</span>
              <span>75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {uploadStep === 'complete' && uploadedPaper && (
        <div className="space-y-8">
          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="text-lg font-semibold text-green-800">Research Successfully Protected!</h3>
                <p className="text-green-700">
                  Your paper "{uploadedPaper.title}" has been tokenized and stored on the blockchain.
                </p>
              </div>
            </div>
          </div>

          {/* Paper Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{uploadedPaper.title}</h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{uploadedPaper.authors.join(', ')}</span>
                  <span>•</span>
                  <span>{uploadedPaper.institution}</span>
                  <span>•</span>
                  <span>{uploadedPaper.uploadDate.toLocaleDateString()}</span>
                </div>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  uploadedPaper.overallSimilarity > 70 ? 'bg-red-100 text-red-800' :
                  uploadedPaper.overallSimilarity > 40 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {uploadedPaper.overallSimilarity > 70 ? (
                    <AlertTriangle className="w-4 h-4 mr-1" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-1" />
                  )}
                  {uploadedPaper.overallSimilarity}% Similarity
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Sections</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">{uploadedPaper.sections.length}</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Hash className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Tokens Created</span>
                </div>
                <p className="text-2xl font-bold text-green-900">{uploadedPaper.sections.length}</p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-800">Uniqueness</span>
                </div>
                <p className="text-2xl font-bold text-purple-900">{100 - uploadedPaper.overallSimilarity}%</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Blockchain Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Transaction ID:</span>
                  <p className="font-mono text-xs mt-1 break-all">{uploadedPaper.blockchainTxId}</p>
                </div>
                <div>
                  <span className="text-gray-600">IPFS Hash:</span>
                  <p className="font-mono text-xs mt-1 break-all">{uploadedPaper.ipfsHash}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tokenized Sections */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Tokenized Sections</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {uploadedPaper.sections.map(section => (
                <SectionCard key={section.id} section={section} />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handleNewUpload}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Upload Another Paper
            </button>
            <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              View Analytics
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchUploadPage;