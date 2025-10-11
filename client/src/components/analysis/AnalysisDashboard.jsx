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
  Radar,
  Cell
} from 'recharts';
import { Play, Pause, Volume2, TrendingUp, Target, Zap } from 'lucide-react';

const AnalysisDashboard = ({ analysisData }) => {
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);

  useEffect(() => {
    if (analysisData) {
      setCurrentTranscript(analysisData.transcript || '');
    }
  }, [analysisData]);

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="card text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Analysis Available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Record a speech in the Performance Studio to see your analysis results here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { overallScore, metrics, fillerWords, pace, recommendations, strengths, areasForImprovement } = analysisData;

  // Prepare data for charts
  const fillerWordsData = Object.entries(fillerWords).map(([word, count]) => ({
    word: word.charAt(0).toUpperCase() + word.slice(1),
    count
  }));

  const radarData = [
    { metric: 'Clarity', score: metrics.clarity, fullMark: 100 },
    { metric: 'Confidence', score: metrics.confidence, fullMark: 100 },
    { metric: 'Fluency', score: metrics.fluency, fullMark: 100 },
    { metric: 'Pace', score: metrics.pace, fullMark: 100 },
    { metric: 'Tone', score: metrics.tone, fullMark: 100 }
  ];

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const handleWordClick = (index) => {
    setCurrentWordIndex(index);
    // In a real implementation, this would play audio from that timestamp
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
          className={`cursor-pointer transition-colors duration-200 ${
            isFillerWord 
              ? 'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-1 rounded' 
              : 'text-gray-900 dark:text-white'
          } ${currentWordIndex === index ? 'bg-blue-200 dark:bg-blue-800' : ''}`}
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Analysis Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Your latest speech analysis results
          </p>
        </div>

        {/* Overall Score */}
        <div className="card text-center">
          <div className="flex items-center justify-center mb-4">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center ${getScoreBgColor(overallScore)}`}>
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
                  {overallScore}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">/ 100</div>
              </div>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Overall Performance Score
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {overallScore >= 80 ? 'Excellent!' : overallScore >= 60 ? 'Good work!' : 'Keep practicing!'}
          </p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pace Gauge */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary-600" />
              Speaking Pace
            </h3>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${getScoreColor(metrics.pace)}`}>
                {pace.wordsPerMinute} WPM
              </div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                pace.status === 'Good' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : pace.status === 'Too Fast'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
              }`}>
                {pace.status}
              </div>
            </div>
          </div>

          {/* Filler Words Chart */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-primary-600" />
              Filler Words
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={fillerWordsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="word" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
            Performance Metrics
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Interactive Transcript */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Volume2 className="w-5 h-5 mr-2 text-primary-600" />
            Interactive Transcript
          </h3>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <p className="text-gray-900 dark:text-white leading-relaxed">
              {highlightFillerWords(currentTranscript)}
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Click on highlighted words to hear that part of your recording
          </p>
        </div>

        {/* Recommendations and Feedback */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="card">
            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4">
              Strengths
            </h3>
            <ul className="space-y-2">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div className="card">
            <h3 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400 mb-4">
              Areas for Improvement
            </h3>
            <ul className="space-y-2">
              {areasForImprovement.map((area, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-gray-300">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommendations */}
        <div className="card">
          <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-4">
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
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboard;
