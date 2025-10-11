import React from 'react';
import { LogIn, UserPlus, Save, TrendingUp } from 'lucide-react';
import Card from './Card';
import Button from './Button';

const GuestPrompt = ({ 
  title = "Want to save your results?", 
  description = "Create an account to save this analysis and track your progress over time.",
  showProgress = true,
  showSave = true,
  className = ""
}) => {
  return (
    <Card className={`bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border-primary-200 dark:border-primary-800 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-4">
            <Save className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-200">
              {title}
            </h3>
            <p className="text-sm text-primary-700 dark:text-primary-300">
              {description}
            </p>
            {showProgress && (
              <div className="mt-2 flex items-center text-xs text-primary-600 dark:text-primary-400">
                <TrendingUp className="w-3 h-3 mr-1" />
                Track your improvement over time
              </div>
            )}
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
  );
};

export default GuestPrompt;
