import React, { useState } from 'react';
import { useResearchProcessor } from '../hooks/useResearchProcessor';
import SimilarityAnalysis from '../components/SimilarityAnalysis';
import ResearchDashboard from '../components/ResearchDashboard';
import { ResearchPaper } from '../types/research';
import { BarChart3, FileText, TrendingUp, Users, Calendar, Filter } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const { papers } = useResearchProcessor();
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'similarity' | 'portfolio'>('overview');
  const [timeFilter, setTimeFilter] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  const overallStats = {
    totalPapers: papers.length,
    totalSections: papers.reduce((sum, paper) => sum + paper.sections.length, 0),
    avgUniqueness: papers.length > 0 
      ? Math.round(papers.reduce((sum, paper) => sum + (100 - paper.overallSimilarity), 0) / papers.length)
      : 0,
    verifiedPapers: papers.filter(p => p.status === 'verified').length
  };

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: BarChart3 },
    { id: 'similarity' as const, label: 'Similarity Analysis', icon: TrendingUp },
    { id: 'portfolio' as const, label: 'Research Portfolio', icon: FileText }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive insights into your research portfolio and IP protection
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="all">All time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Papers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{overallStats.totalPapers}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sections</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{overallStats.totalSections}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Uniqueness</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{overallStats.avgUniqueness}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Verified Papers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{overallStats.verifiedPapers}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Research Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Research Timeline
            </h3>
            <div className="space-y-4">
              {papers.slice(0, 5).map((paper, index) => (
                <div key={paper.id} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{paper.title}</p>
                    <p className="text-sm text-gray-600">
                      {paper.uploadDate.toLocaleDateString()} • {paper.sections.length} sections
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    paper.status === 'verified' ? 'bg-green-100 text-green-800' :
                    paper.status === 'flagged' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {paper.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Uniqueness Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Uniqueness Distribution</h3>
            <div className="space-y-3">
              {[
                { range: '90-100%', count: papers.filter(p => (100 - p.overallSimilarity) >= 90).length, color: 'bg-green-500' },
                { range: '70-89%', count: papers.filter(p => (100 - p.overallSimilarity) >= 70 && (100 - p.overallSimilarity) < 90).length, color: 'bg-blue-500' },
                { range: '50-69%', count: papers.filter(p => (100 - p.overallSimilarity) >= 50 && (100 - p.overallSimilarity) < 70).length, color: 'bg-yellow-500' },
                { range: '30-49%', count: papers.filter(p => (100 - p.overallSimilarity) >= 30 && (100 - p.overallSimilarity) < 50).length, color: 'bg-orange-500' },
                { range: '0-29%', count: papers.filter(p => (100 - p.overallSimilarity) < 30).length, color: 'bg-red-500' }
              ].map((item) => (
                <div key={item.range} className="flex items-center space-x-3">
                  <div className="w-20 text-sm text-gray-600">{item.range}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${item.color}`}
                      style={{ width: `${papers.length > 0 ? (item.count / papers.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <div className="w-8 text-sm text-gray-900 font-medium">{item.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'similarity' && (
        <div className="space-y-6">
          {selectedPaper ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Similarity Analysis: {selectedPaper.title}
                </h2>
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="px-4 py-2 text-blue-600 hover:text-blue-500 font-medium"
                >
                  ← Back to list
                </button>
              </div>
              <SimilarityAnalysis paper={selectedPaper} />
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Paper for Analysis</h2>
              {papers.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Research Papers</h3>
                  <p className="text-gray-600">Upload your first research paper to see detailed analysis.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {papers.map(paper => (
                    <div
                      key={paper.id}
                      onClick={() => setSelectedPaper(paper)}
                      className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">{paper.title}</h3>
                          <p className="text-sm text-gray-600">
                            {paper.sections.length} sections • {paper.overallSimilarity}% similarity • {paper.uploadDate.toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            paper.overallSimilarity > 70 ? 'bg-red-100 text-red-800' :
                            paper.overallSimilarity > 40 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {100 - paper.overallSimilarity}% Unique
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'portfolio' && (
        <ResearchDashboard papers={papers} />
      )}
    </div>
  );
};

export default AnalyticsPage;