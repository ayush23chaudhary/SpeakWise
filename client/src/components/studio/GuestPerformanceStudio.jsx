import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, LogIn, UserPlus } from 'lucide-react';
import useAudioRecorder from '../../hooks/useAudioRecorder';
import Button from '../common/Button';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';
import { RECORDING_TIPS } from '../../utils/constants';
import { generateGuestAnalysis } from '../../utils/guestUtils';

const GuestPerformanceStudio = ({ onAnalysisComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  
  const {
    isRecording,
    isPaused,
    audioBlob,
    audioUrl,
    volume,
    duration,
    error,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    resetRecording,
    getFormattedDuration
  } = useAudioRecorder();

  const audioRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleAudioPlay = () => {
    setIsPlaying(true);
  };

  const handleAudioPause = () => {
    setIsPlaying(false);
  };

  const analyzeRecording = async () => {
    if (!audioBlob) return;
    
    setIsAnalyzing(true);
    
    try {
      // For guest mode, we'll use a mock analysis without saving to database
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
      
      // Generate mock analysis data
      const mockAnalysis = generateMockAnalysis();
      onAnalysisComplete(mockAnalysis);
      
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateMockAnalysis = () => {
    return generateGuestAnalysis();
  };

  const downloadRecording = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `speakwise-guest-recording-${Date.now()}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const getVolumeColor = () => {
    if (volume < 20) return 'bg-gray-300 dark:bg-gray-600';
    if (volume < 40) return 'bg-yellow-400';
    if (volume < 60) return 'bg-orange-400';
    if (volume < 80) return 'bg-red-400';
    return 'bg-red-600';
  };

  const getVolumeIntensity = () => {
    return Math.min(volume / 50, 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Performance Studio
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Record your speech and get AI-powered analysis
          </p>
          
          {/* Guest Mode Notice */}
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
            Guest Mode - Results won't be saved
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Recording Area */}
          <div className="lg:col-span-2">
            <Card className="text-center">
              {/* Vocal Orb Visualizer */}
              <div className="mb-8">
                <div className="relative w-80 h-80 mx-auto">
                  <div 
                    className={`absolute inset-0 rounded-full transition-all duration-150 ${
                      isRecording ? 'bg-gradient-to-r from-primary-400 to-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                    style={{
                      transform: `scale(${1 + getVolumeIntensity() * 0.4})`,
                      boxShadow: isRecording 
                        ? `0 0 ${30 + volume * 3}px rgba(59, 130, 246, ${0.4 + volume / 200})` 
                        : 'none'
                    }}
                  >
                    <div className="absolute inset-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                      <Mic className={`w-20 h-20 ${isRecording ? 'text-primary-600' : 'text-gray-400'}`} />
                    </div>
                    
                    {isRecording && (
                      <div 
                        className={`absolute inset-0 rounded-full ${getVolumeColor()} opacity-30`}
                        style={{
                          transform: `scale(${1 + getVolumeIntensity() * 0.2})`,
                          transition: 'all 0.1s ease-out'
                        }}
                      />
                    )}
                    
                    {isRecording && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-3 h-3 bg-primary-400 rounded-full animate-ping"
                            style={{
                              top: `${15 + Math.sin(i * 0.5) * 35}%`,
                              left: `${15 + Math.cos(i * 0.5) * 35}%`,
                              animationDelay: `${i * 0.1}s`,
                              animationDuration: `${0.8 + getVolumeIntensity() * 0.4}s`
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Recording Status */}
              <div className="mb-6">
                {isRecording && (
                  <div className="space-y-2">
                    <div className="text-2xl font-mono text-primary-600 dark:text-primary-400">
                      {getFormattedDuration()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {isPaused ? 'Recording Paused' : 'Recording in progress...'}
                    </div>
                  </div>
                )}
              </div>

              {/* Error Display */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Recording Controls */}
              <div className="space-y-4">
                {!audioBlob ? (
                  <div className="space-y-3">
                    <Button
                      onClick={isRecording ? stopRecording : startRecording}
                      variant={isRecording ? 'danger' : 'primary'}
                      size="lg"
                      icon={isRecording ? Square : Mic}
                      className="px-8 py-4 text-lg"
                    >
                      {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </Button>
                    
                    {isRecording && (
                      <div className="flex justify-center space-x-3">
                        <Button
                          onClick={isPaused ? resumeRecording : pauseRecording}
                          variant="secondary"
                          size="md"
                          icon={isPaused ? Play : Pause}
                        >
                          {isPaused ? 'Resume' : 'Pause'}
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center space-x-3">
                      <Button
                        onClick={handlePlayPause}
                        variant="secondary"
                        icon={isPlaying ? Pause : Play}
                      >
                        {isPlaying ? 'Pause' : 'Play'}
                      </Button>
                      
                      <Button
                        onClick={resetRecording}
                        variant="outline"
                      >
                        Record Again
                      </Button>
                      
                      <Button
                        onClick={downloadRecording}
                        variant="outline"
                      >
                        Download
                      </Button>
                    </div>
                    
                    <Button
                      onClick={analyzeRecording}
                      disabled={isAnalyzing}
                      variant="primary"
                      size="lg"
                      className="px-8 py-4 text-lg"
                    >
                      {isAnalyzing ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Analyzing...
                        </>
                      ) : (
                        'Stop & Analyze'
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {/* Audio Element */}
              {audioUrl && (
                <audio
                  ref={audioRef}
                  src={audioUrl}
                  onEnded={handleAudioEnded}
                  onPlay={handleAudioPlay}
                  onPause={handleAudioPause}
                />
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recording Tips */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recording Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {RECORDING_TIPS.slice(0, 5).map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Guest Benefits */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Unlock Full Features
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Create an account to save your analysis results and track your progress over time.
              </p>
              <div className="space-y-2">
                <Button
                  onClick={() => window.location.href = '/register'}
                  variant="primary"
                  size="sm"
                  icon={UserPlus}
                  className="w-full"
                >
                  Create Account
                </Button>
                <Button
                  onClick={() => window.location.href = '/login'}
                  variant="outline"
                  size="sm"
                  icon={LogIn}
                  className="w-full"
                >
                  Sign In
                </Button>
              </div>
            </Card>

            {/* Recording Stats */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Session Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {getFormattedDuration()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Volume Level:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {volume}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <span className={`font-medium ${
                    isRecording ? 'text-green-600 dark:text-green-400' : 
                    audioBlob ? 'text-blue-600 dark:text-blue-400' : 
                    'text-gray-600 dark:text-gray-400'
                  }`}>
                    {isRecording ? 'Recording' : audioBlob ? 'Ready' : 'Idle'}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestPerformanceStudio;
