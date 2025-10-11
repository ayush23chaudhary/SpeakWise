import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { TrendingUp, Calendar, Filter, Eye } from 'lucide-react';
import api from '../../utils/api';

const ProgressTracker = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState('overallScore');
  const [selectedReport, setSelectedReport] = useState(null);
  const [timeRange, setTimeRange] = useState('all');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await api.get('/speech/history');
      setReports(response.data.reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMetricLabel = (metric) => {
    const labels = {
      overallScore: 'Overall Score',
      clarity: 'Clarity',
      confidence: 'Confidence',
      fluency: 'Fluency',
      pace: 'Pace',
      tone: 'Tone'
    };
    return labels[metric] || metric;
  };

  const getMetricColor = (metric) => {
    const colors = {
      overallScore: '#3b82f6',
      clarity: '#10b981',
      confidence: '#f59e0b',
      fluency: '#ef4444',
      pace: '#8b5cf6',
      tone: '#06b6d4'
    };
    return colors[metric] || '#3b82f6';
  };

  const filterReportsByTimeRange = (reports) => {
    const now = new Date();
    const filtered = reports.filter(report => {
      const reportDate = new Date(report.createdAt);
      
      switch (timeRange) {
        case 'week':
          return reportDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        case 'month':
          return reportDate >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        case 'quarter':
          return reportDate >= new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        default:
          return true;
      }
    });
    
    return filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  };

  const prepareChartData = () => {
    const filteredReports = filterReportsByTimeRange(reports);
    
    return filteredReports.map((report, index) => ({
      index: index + 1,
      date: formatDate(report.createdAt),
      fullDate: report.createdAt,
      overallScore: report.overallScore,
      clarity: report.analysisData?.metrics?.clarity || 0,
      confidence: report.analysisData?.metrics?.confidence || 0,
      fluency: report.analysisData?.metrics?.fluency || 0,
      pace: report.analysisData?.metrics?.pace || 0,
      tone: report.analysisData?.metrics?.tone || 0
    }));
  };

  const calculateProgressStats = () => {
    if (reports.length < 2) return null;
    
    const sortedReports = [...reports].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    const firstScore = sortedReports[0].overallScore;
    const latestScore = sortedReports[sortedReports.length - 1].overallScore;
    const improvement = latestScore - firstScore;
    
    return {
      improvement,
      totalSessions: reports.length,
      averageScore: Math.round(reports.reduce((sum, r) => sum + r.overallScore, 0) / reports.length),
      bestScore: Math.max(...reports.map(r => r.overallScore)),
      improvementPercentage: Math.round((improvement / firstScore) * 100)
    };
  };

  const viewReport = async (reportId) => {
    try {
      const response = await api.get(`/speech/report/${reportId}`);
      setSelectedReport(response.data.report);
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };

  const closeReportModal = () => {
    setSelectedReport(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="card text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading your progress...</p>
          </div>
        </div>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="card text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Progress Data Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Complete your first speech analysis to start tracking your progress.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const chartData = prepareChartData();
  const stats = calculateProgressStats();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Progress Tracker
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Track your speech improvement over time
          </p>
        </div>

        {/* Progress Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card text-center">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {stats.totalSessions}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Sessions</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.averageScore}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Score</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.bestScore}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Best Score</div>
            </div>
            <div className="card text-center">
              <div className={`text-2xl font-bold ${stats.improvement >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {stats.improvement >= 0 ? '+' : ''}{stats.improvement}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Improvement</div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="card">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Metric:
              </label>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="input-field w-auto"
              >
                <option value="overallScore">Overall Score</option>
                <option value="clarity">Clarity</option>
                <option value="confidence">Confidence</option>
                <option value="fluency">Fluency</option>
                <option value="pace">Pace</option>
                <option value="tone">Tone</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Time Range:
              </label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="input-field w-auto"
              >
                <option value="all">All Time</option>
                <option value="quarter">Last 3 Months</option>
                <option value="month">Last Month</option>
                <option value="week">Last Week</option>
              </select>
            </div>
          </div>
        </div>

        {/* Progress Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
            {getMetricLabel(selectedMetric)} Progress
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="index" 
                tickFormatter={(value) => `Session ${value}`}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                labelFormatter={(value, payload) => {
                  if (payload && payload[0]) {
                    return `Session ${value} - ${payload[0].payload.date}`;
                  }
                  return `Session ${value}`;
                }}
                formatter={(value) => [value, getMetricLabel(selectedMetric)]}
              />
              <Line 
                type="monotone" 
                dataKey={selectedMetric} 
                stroke={getMetricColor(selectedMetric)}
                strokeWidth={3}
                dot={{ fill: getMetricColor(selectedMetric), strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Sessions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary-600" />
            Recent Sessions
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Time
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Score
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {reports.slice(0, 10).map((report) => (
                  <tr key={report._id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                      {formatDate(report.createdAt)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {formatTime(report.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        report.overallScore >= 80 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : report.overallScore >= 60
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {report.overallScore}/100
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => viewReport(report._id)}
                        className="btn-secondary text-xs flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Analysis Report
                  </h3>
                  <button
                    onClick={closeReportModal}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                      {selectedReport.overallScore}/100
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Overall Performance Score
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedReport.pace?.wordsPerMinute || 0} WPM
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Speaking Pace</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedReport.totalFillerWords || 0}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Filler Words</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Transcript</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      {selectedReport.transcript}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;
