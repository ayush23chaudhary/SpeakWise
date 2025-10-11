import React, { useState, useEffect } from 'react';
import GuestNavbar from './GuestNavbar';
import TabNavigation from './TabNavigation';
import GuestPerformanceStudio from '../studio/GuestPerformanceStudio';
import GuestAnalysisDashboard from '../analysis/GuestAnalysisDashboard';
import useThemeStore from '../../store/themeStore';

const GuestMainApp = () => {
  const [activeTab, setActiveTab] = useState('studio');
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const { isDark, setTheme } = useThemeStore();

  // Initialize theme on app load
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleAnalysisComplete = (analysisData) => {
    setCurrentAnalysis(analysisData);
    setActiveTab('analysis');
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'studio':
        return <GuestPerformanceStudio onAnalysisComplete={handleAnalysisComplete} />;
      case 'analysis':
        return <GuestAnalysisDashboard analysisData={currentAnalysis} />;
      case 'progress':
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-6xl mx-auto">
              <div className="card text-center py-12">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Progress Tracking
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Create an account to track your speech improvement over time and view your analysis history.
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => window.location.href = '/register'}
                    className="btn-primary"
                  >
                    Create Account
                  </button>
                  <button
                    onClick={() => window.location.href = '/login'}
                    className="btn-secondary"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <GuestPerformanceStudio onAnalysisComplete={handleAnalysisComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <GuestNavbar />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {renderActiveTab()}
      </main>
    </div>
  );
};

export default GuestMainApp;
