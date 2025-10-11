import React from 'react';
import { Mic, BarChart3, TrendingUp } from 'lucide-react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: 'studio',
      label: 'Performance Studio',
      icon: Mic,
      description: 'Record and practice your speech'
    },
    {
      id: 'analysis',
      label: 'Analysis Dashboard',
      icon: BarChart3,
      description: 'View your latest analysis results'
    },
    {
      id: 'progress',
      label: 'Progress Tracker',
      icon: TrendingUp,
      description: 'Track your improvement over time'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-3 px-6 py-4 text-sm font-medium rounded-t-lg transition-all duration-200
                  ${isActive 
                    ? 'tab-active shadow-lg' 
                    : 'tab-inactive hover:shadow-md'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                <div className="text-left">
                  <div className={isActive ? 'text-white' : 'text-gray-700 dark:text-gray-300'}>
                    {tab.label}
                  </div>
                  <div className={`text-xs ${isActive ? 'text-primary-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {tab.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
