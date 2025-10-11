import React from 'react';
import { User, LogIn, UserPlus } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

const GuestMode = ({ onLogin, onRegister }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to SpeakWise
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Experience AI-powered speech analysis. You can try our features as a guest or create an account to save your progress.
          </p>
          
          <div className="space-y-3">
            <Button
              onClick={() => window.location.href = '/guest'}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Continue as Guest
            </Button>
            
            <div className="flex space-x-3">
              <Button
                onClick={onLogin}
                variant="outline"
                icon={LogIn}
                className="flex-1"
              >
                Sign In
              </Button>
              <Button
                onClick={onRegister}
                variant="outline"
                icon={UserPlus}
                className="flex-1"
              >
                Sign Up
              </Button>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Guest Mode Benefits:
            </h3>
            <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Try speech recording and analysis</li>
              <li>• Experience all features</li>
              <li>• No account required</li>
            </ul>
          </div>
          
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-2">
              Account Benefits:
            </h3>
            <ul className="text-xs text-green-700 dark:text-green-300 space-y-1">
              <li>• Save analysis results</li>
              <li>• Track progress over time</li>
              <li>• Access history</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GuestMode;
