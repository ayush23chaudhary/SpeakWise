// Constants for SpeakWise application

export const APP_CONFIG = {
  name: 'SpeakWise',
  version: '1.0.0',
  description: 'AI-Powered Speech Coach',
  author: 'SpeakWise Team'
};

export const API_ENDPOINTS = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    me: '/auth/me'
  },
  speech: {
    analyze: '/speech/analyze',
    history: '/speech/history',
    report: (id) => `/speech/report/${id}`
  }
};

export const RECORDING_CONFIG = {
  maxDuration: 300, // 5 minutes in seconds
  minDuration: 5, // 5 seconds minimum
  maxFileSize: 10 * 1024 * 1024, // 10MB
  supportedFormats: ['audio/webm', 'audio/mp3', 'audio/wav', 'audio/ogg'],
  defaultFormat: 'audio/webm'
};

export const ANALYSIS_METRICS = {
  overallScore: {
    min: 0,
    max: 100,
    thresholds: {
      excellent: 80,
      good: 60,
      needsImprovement: 40
    }
  },
  individualMetrics: {
    clarity: { min: 0, max: 100 },
    confidence: { min: 0, max: 100 },
    fluency: { min: 0, max: 100 },
    pace: { min: 0, max: 100 },
    tone: { min: 0, max: 100 }
  },
  pace: {
    wordsPerMinute: {
      tooSlow: 120,
      good: { min: 140, max: 180 },
      tooFast: 200
    }
  }
};

export const FILLER_WORDS = [
  'um', 'uh', 'ah', 'er', 'like', 'you know', 'so', 'well', 'actually',
  'basically', 'literally', 'obviously', 'clearly', 'definitely',
  'probably', 'maybe', 'perhaps', 'sort of', 'kind of'
];

export const THEME_CONFIG = {
  light: {
    name: 'Light',
    class: 'light'
  },
  dark: {
    name: 'Dark',
    class: 'dark'
  }
};

export const CHART_COLORS = {
  primary: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#06b6d4',
  purple: '#8b5cf6',
  pink: '#ec4899',
  gray: '#6b7280'
};

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500
};

export const TOAST_DURATIONS = {
  short: 3000,
  normal: 5000,
  long: 8000
};

export const LOCAL_STORAGE_KEYS = {
  auth: 'auth-storage',
  theme: 'theme-storage',
  settings: 'speakwise-settings'
};

export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection.',
  unauthorized: 'Session expired. Please log in again.',
  forbidden: 'You do not have permission to perform this action.',
  notFound: 'The requested resource was not found.',
  serverError: 'Server error. Please try again later.',
  validation: 'Please check your input and try again.',
  microphone: 'Microphone access denied. Please allow microphone permissions.',
  audio: 'Audio recording failed. Please try again.',
  analysis: 'Analysis failed. Please try again.'
};

export const SUCCESS_MESSAGES = {
  login: 'Successfully logged in!',
  register: 'Account created successfully!',
  logout: 'Successfully logged out!',
  recording: 'Recording completed successfully!',
  analysis: 'Analysis completed successfully!',
  settings: 'Settings saved successfully!'
};

export const RECORDING_TIPS = [
  'Find a quiet environment with minimal background noise',
  'Speak clearly and at a comfortable pace',
  'Maintain a consistent distance from your microphone',
  'Practice speaking for 30-60 seconds for best results',
  'Take deep breaths and relax before recording',
  'Speak naturally as if talking to a friend',
  'Avoid reading from a script if possible',
  'Focus on clarity over speed'
];

export const ANALYSIS_RECOMMENDATIONS = {
  clarity: [
    'Practice enunciating words clearly',
    'Slow down your speaking pace slightly',
    'Focus on pronouncing consonants distinctly'
  ],
  confidence: [
    'Practice speaking with conviction',
    'Use a slightly louder voice',
    'Avoid apologetic language'
  ],
  fluency: [
    'Practice speaking without long pauses',
    'Work on smooth transitions between ideas',
    'Reduce hesitation in your speech'
  ],
  pace: [
    'Practice speaking at a steady rhythm',
    'Use pauses strategically instead of filler words',
    'Record yourself and adjust your pace'
  ],
  tone: [
    'Practice varying your vocal pitch',
    'Use appropriate emotional expression',
    'Avoid monotone delivery'
  ]
};
