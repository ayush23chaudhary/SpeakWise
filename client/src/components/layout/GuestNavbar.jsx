import React from 'react';
import { Mic, LogIn, UserPlus, Sun, Moon } from 'lucide-react';
import useThemeStore from '../../store/themeStore';
import Button from '../common/Button';

const GuestNavbar = () => {
  const { isDark, toggleTheme } = useThemeStore();

  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleRegister = () => {
    window.location.href = '/register';
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">SpeakWise</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">AI Speech Coach</p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Guest Badge */}
            <div className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-sm font-medium rounded-full">
              Guest Mode
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleLogin}
                variant="outline"
                size="sm"
                icon={LogIn}
              >
                Sign In
              </Button>
              <Button
                onClick={handleRegister}
                variant="primary"
                size="sm"
                icon={UserPlus}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default GuestNavbar;
