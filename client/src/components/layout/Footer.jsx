import React from 'react';
import { Heart, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">SpeakWise</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">AI Speech Coach</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Transform your speech, one word at a time. Our AI-powered platform helps you improve your speaking skills through personalized analysis and progress tracking.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/speakwise"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/speakwise"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@speakwise.com"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Features
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="#studio" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Performance Studio
                </a>
              </li>
              <li>
                <a href="#analysis" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  AI Analysis
                </a>
              </li>
              <li>
                <a href="#progress" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Progress Tracking
                </a>
              </li>
              <li>
                <a href="#tips" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Speech Tips
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="/help" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} SpeakWise. All rights reserved.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 md:mt-0 flex items-center">
              Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> by the SpeakWise Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
