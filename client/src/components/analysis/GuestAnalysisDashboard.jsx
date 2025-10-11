import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  Play, 
  Pause, 
  Volume2, 
  TrendingUp, 
  Target, 
  Zap, 
  Award,
  Clock,
  MessageSquare,
  ThumbsUp,
  AlertTriangle,
  Lightbulb,
  LogIn,
  UserPlus,
  Save
} from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { CHART_COLORS } from '../../utils/constants';

const GuestAnalysisDashboard = ({ analysisData }) => {
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [showSavePrompt, setShowSavePrompt] = useState(false);

  useEffect(() => {
    if (analysisData) {
      setCurrentTranscript(analysisData.transcript || '');
    }
  }, [analysisData]);

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <Card className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Analysis Available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Record a speech in the Performance Studio to see your analysis results here.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  const { 
    overallScore, 
    metrics, 
    fillerWords, 
    pace, 
    recommendations, 
    strengths, 
    areasForImprovement 
  } = analysisData;

  // Prepare data for charts
  const fillerWordsData = Object.entries(fillerWords).map(([word, count]) => ({
    word: word.charAt(0).toUpperCase() + word.slice(1),
    count,
    fill: CHART_COLORS.primary
  }));

  const radarData = [
    { metric: 'Clarity', score: metrics.clarity, fullMark: 100 },
    { metric: 'Confidence', score: metrics.confidence, fullMark: 100 },
    { metric: 'Fluency', score: metrics.fluency, fullMark: 100 },
    { metric: 'Pace', score: metrics.pace, fullMark: 100 },
    { metric: 'Tone', score: metrics.tone, fullMark: 100 }
  ];

  const handleWordClick = (index) => {
    setCurrentWordIndex(index);
    console.log(`Playing audio from word index: ${index}`);
  };

  const highlightFillerWords = (text) => {
    const words = text.split(' ');
    return words.map((word, index) => {
      const cleanWord = word.toLowerCase().replace(/[.,!?;:]/, '');
      const isFillerWord = Object.keys(fillerWords).includes(cleanWord);
      
      return (
        <span
          key={index}
          className={`cursor-pointer transition-all duration-200 ${
            isFillerWord 
              ? 'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-1 rounded hover:bg-yellow-300 dark:hover:bg-yellow-700' 
              : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-1 rounded'
          } ${currentWordIndex === index ? 'bg-blue-200 dark:bg-blue-800 ring-2 ring-blue-400' : ''}`}
          onClick={() => handleWordClick(index)}
          title={isFillerWord ? `Filler word: ${cleanWord}` : ''}
        >
          {word}{' '}
        </span>
      );
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/20';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/20';
    return 'bg-red-100 dark:bg-red-900/20';
  };

  const getPerformanceLevel = (score) => {
    if (score >= 80) return { level: 'Excellent', icon: Award, color: 'text-green-600' };
    if (score >= 60) return { level: 'Good', icon: ThumbsUp, color: 'text-yellow-600' };
    return { level: 'Needs Work', icon: AlertTriangle, color: 'text-red-600' };
  };

  const performanceLevel = getPerformanceLevel(overallScore);
  const PerformanceIcon = performanceLevel.icon;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Analysis Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Your speech analysis results
          </p>
          
          {/* Guest Mode Notice */}
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
            Guest Mode - Results not saved
          </div>
        </div>

        {/* Save Prompt */}
        <Card className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border-primary-200 dark:border-primary-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Save className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-200">
                  Want to save your results?
                </h3>
                <p className="text-sm text-primary-700 dark:text-primary-300">
                  Create an account to save this analysis and track your progress over time.
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => window.location.href = '/register'}
                variant="primary"
                size="sm"
                icon={UserPlus}
              >
                Sign Up
              </Button>
              <Button
                onClick={() => window.location.href = '/login'}
                variant="outline"
                size="sm"
                icon={LogIn}
              >
                Sign In
              </Button>
            </div>
          </div>
        </Card>

        {/* Overall Score Card */}
        <Card className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className={`w-40 h-40 rounded-full flex items-center justify-center ${getScoreBgColor(overallScore)} relative`}>
              <div className="text-center">
                <div className={`text-5xl font-bold ${getScoreColor(overallScore)} mb-2`}>
                  {overallScore}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">/ 100</div>
              </div>
              
              <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700">
                <PerformanceIcon className={`w-6 h-6 ${performanceLevel.color}`} />
              </div>
            </div>
          </div>
          
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Overall Performance Score
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {performanceLevel.level} - {overallScore >= 80 ? 'Outstanding work!' : overallScore >= 60 ? 'Good progress!' : 'Keep practicing!'}
          </p>
        </Card>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pace Gauge */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary-600" />
              Speaking Pace
            </h3>
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(metrics.pace)}`}>
                {pace.wordsPerMinute} WPM
              </div>
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                pace.status === 'Good' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : pace.status === 'Too Fast'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
              }`}>
                {pace.status}
              </div>
            </div>
          </Card>

          {/* Filler Words Chart */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-primary-600" />
              Filler Words Analysis
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={fillerWordsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="word" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill={CHART_COLORS.primary} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Object.values(fillerWords).reduce((sum, count) => sum + count, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Filler Words
              </div>
            </div>
          </Card>
        </div>

        {/* Radar Chart */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
            Performance Metrics Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Score"
                dataKey="score"
                stroke={CHART_COLORS.primary}
                fill={CHART_COLORS.primary}
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Interactive Transcript */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-primary-600" />
            Interactive Transcript
          </h3>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <p className="text-gray-900 dark:text-white leading-relaxed text-lg">
              {highlightFillerWords(currentTranscript)}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <p>Click on highlighted words to hear that part of your recording</p>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <div className="w-3 h-3 bg-yellow-200 dark:bg-yellow-800 rounded mr-2"></div>
                Filler Words
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 bg-blue-200 dark:bg-blue-800 rounded mr-2"></div>
                Selected
              </span>
            </div>
          </div>
        </Card>

        {/* Recommendations and Feedback */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Strengths */}
          <Card>
            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center">
              <ThumbsUp className="w-5 h-5 mr-2" />
              Strengths
            </h3>
            <ul className="space-y-3">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Areas for Improvement */}
          <Card>
            <h3 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Areas for Improvement
            </h3>
            <ul className="space-y-3">
              {areasForImprovement.map((area, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-gray-300">{area}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Recommendations */}
          <Card>
            <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2" />
              Recommendations
            </h3>
            <ul className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{recommendation}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Action Buttons */}
        <Card className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Next Steps
          </h3>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => window.location.href = '/guest'}
              variant="primary"
              size="lg"
            >
              Record Another Speech
            </Button>
            <Button
              onClick={() => window.location.href = '/register'}
              variant="outline"
              size="lg"
              icon={UserPlus}
            >
              Create Account
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GuestAnalysisDashboard;
