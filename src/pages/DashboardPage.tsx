import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useResearchProcessor } from '../hooks/useResearchProcessor';
import { 
  Shield, 
  Upload, 
  FileText, 
  TrendingUp, 
  Users, 
  Award,
  ArrowUpRight,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { papers } = useResearchProcessor();

  const stats = [
    {
      name: 'Protected Papers',
      value: papers.length.toString(),
      change: '+12%',
      changeType: 'positive' as const,
      icon: Shield,
      color: 'bg-blue-500'
    },
    {
      name: 'Total Sections',
      value: papers.reduce((sum, paper) => sum + paper.sections.length, 0).toString(),
      change: '+8%',
      changeType: 'positive' as const,
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      name: 'Avg. Uniqueness',
      value: papers.length > 0 
        ? `${Math.round(papers.reduce((sum, paper) => sum + (100 - paper.overallSimilarity), 0) / papers.length)}%`
        : '0%',
      change: '+5%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      name: 'Collaborations',
      value: '3',
      change: '+2',
      changeType: 'positive' as const,
      icon: Users,
      color: 'bg-orange-500'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'upload',
      title: 'New research paper uploaded',
      description: 'Machine Learning in Healthcare',
      time: '2 hours ago',
      icon: Upload,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      type: 'verification',
      title: 'Paper verification completed',
      description: 'Blockchain Security Analysis',
      time: '5 hours ago',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 3,
      type: 'collaboration',
      title: 'Collaboration request received',
      description: 'From Dr. Smith at MIT',
      time: '1 day ago',
      icon: Users,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.firstName}!
            </h1>
            <p className="text-blue-100 text-lg">
              Your research is protected and ready for the world to see.
            </p>
            <div className="mt-4 flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Blockchain Connected</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span className="capitalize">{user?.subscription} Plan</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
              <Shield className="w-16 h-16 text-white opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className={`w-10 h-10 ${activity.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <activity.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6 space-y-4">
            <Link
              to="/upload"
              className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900 group-hover:text-blue-600">Upload Research</p>
                <p className="text-sm text-gray-600">Protect new academic work</p>
              </div>
            </Link>

            <Link
              to="/analytics"
              className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900 group-hover:text-green-600">View Analytics</p>
                <p className="text-sm text-gray-600">Analyze research impact</p>
              </div>
            </Link>

            <button className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group w-full text-left">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900 group-hover:text-purple-600">Invite Collaborators</p>
                <p className="text-sm text-gray-600">Share research access</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Papers */}
      {papers.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Papers</h3>
              <Link
                to="/analytics"
                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="grid gap-4">
              {papers.slice(0, 3).map((paper) => (
                <div key={paper.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{paper.title}</p>
                      <p className="text-sm text-gray-600">
                        {paper.sections.length} sections • {100 - paper.overallSimilarity}% unique
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      paper.status === 'verified' ? 'bg-green-100 text-green-800' :
                      paper.status === 'flagged' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {paper.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;