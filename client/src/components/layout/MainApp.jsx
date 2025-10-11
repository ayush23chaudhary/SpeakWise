import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import TabNavigation from './TabNavigation';
import PerformanceStudio from '../studio/PerformanceStudio';
import AnalysisDashboard from '../analysis/AnalysisDashboard';
import ProgressTracker from '../progress/ProgressTracker';
import useThemeStore from '../../store/themeStore';

const MainApp = () => {
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
        return <PerformanceStudio onAnalysisComplete={handleAnalysisComplete} />;
      case 'analysis':
        return <AnalysisDashboard analysisData={currentAnalysis} />;
      case 'progress':
        return <ProgressTracker />;
      default:
        return <PerformanceStudio onAnalysisComplete={handleAnalysisComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {renderActiveTab()}
      </main>
    </div>
  );
};

export default MainApp;
