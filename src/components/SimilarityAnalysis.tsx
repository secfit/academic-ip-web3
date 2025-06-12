import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ResearchPaper } from '../types/research';
import { AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

interface SimilarityAnalysisProps {
  paper: ResearchPaper;
}

const SimilarityAnalysis: React.FC<SimilarityAnalysisProps> = ({ paper }) => {
  const sectionData = paper.sections.map(section => ({
    name: section.title,
    similarity: section.similarity || 0,
    color: (section.similarity || 0) > 70 ? '#ef4444' : (section.similarity || 0) > 40 ? '#f59e0b' : '#10b981'
  }));

  const overallData = [
    { name: 'Unique Content', value: 100 - paper.overallSimilarity, color: '#10b981' },
    { name: 'Similar Content', value: paper.overallSimilarity, color: '#ef4444' }
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-sm font-medium">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Similarity Analysis</h3>
        <div className="flex items-center space-x-2">
          {paper.overallSimilarity > 70 ? (
            <AlertTriangle className="w-5 h-5 text-red-600" />
          ) : (
            <CheckCircle className="w-5 h-5 text-green-600" />
          )}
          <span className={`font-semibold ${paper.overallSimilarity > 70 ? 'text-red-600' : 'text-green-600'}`}>
            {paper.overallSimilarity}% Overall Similarity
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Section-wise Analysis</span>
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="name" 
                  className="text-xs"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis className="text-xs" />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Similarity']}
                  labelStyle={{ color: '#374151' }}
                />
                <Bar dataKey="similarity" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                  {sectionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-4">Overall Uniqueness</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={overallData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {overallData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {overallData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {paper.overallSimilarity > 40 && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-yellow-800">Similarity Alert</h5>
              <p className="text-sm text-yellow-700 mt-1">
                This research shows significant similarity to existing work. Please review the analysis and ensure proper citations are included.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimilarityAnalysis;