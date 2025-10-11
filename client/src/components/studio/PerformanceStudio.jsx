import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause } from 'lucide-react';
import api from '../../utils/api';

const PerformanceStudio = ({ onAnalysisComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0);
  const [recordingDuration, setRecordingDuration] = useState(0);
  
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  // Initialize audio context for volume detection
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks = [];
      
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      startTimeRef.current = Date.now();
      
      // Start volume monitoring
      startVolumeMonitoring(stream);
      startDurationTimer();
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      streamRef.current.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  const startVolumeMonitoring = (stream) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    
    microphone.connect(analyser);
    analyser.fftSize = 256;
    
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    
    const updateVolume = () => {
      if (isRecording) {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
        setVolume(average);
        animationRef.current = requestAnimationFrame(updateVolume);
      }
    };
    
    updateVolume();
  };

  const startDurationTimer = () => {
    const updateDuration = () => {
      if (isRecording && startTimeRef.current) {
        setRecordingDuration(Math.floor((Date.now() - startTimeRef.current) / 1000));
        setTimeout(updateDuration, 1000);
      }
    };
    updateDuration();
  };

  const playRecording = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const analyzeRecording = async () => {
    if (!audioBlob) return;
    
    setIsAnalyzing(true);
    
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      
      const response = await api.post('/speech/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      onAnalysisComplete(response.data.report);
      
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetRecording = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setIsPlaying(false);
    setVolume(0);
    setRecordingDuration(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Performance Studio
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Record your speech and get AI-powered analysis
          </p>
        </div>

        {/* Main Recording Area */}
        <div className="card text-center">
          {/* Vocal Orb Visualizer */}
          <div className="mb-8">
            <div className="relative w-64 h-64 mx-auto">
              <div 
                className={`absolute inset-0 rounded-full transition-all duration-150 ${
                  isRecording 
                    ? 'bg-gradient-to-r from-primary-400 to-primary-600 shadow-2xl' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
                style={{
                  transform: `scale(${1 + (volume / 100) * 0.3})`,
                  boxShadow: isRecording 
                    ? `0 0 ${20 + volume * 2}px rgba(59, 130, 246, ${0.3 + volume / 200})` 
                    : 'none'
                }}
              >
                <div className="absolute inset-4 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                  <Mic className={`w-16 h-16 ${isRecording ? 'text-primary-600' : 'text-gray-400'}`} />
                </div>
              </div>
              
              {/* Particle Effect */}
              {isRecording && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-primary-400 rounded-full animate-ping"
                      style={{
                        top: `${20 + Math.sin(i) * 30}%`,
                        left: `${20 + Math.cos(i) * 30}%`,
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: `${1 + volume / 100}s`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recording Controls */}
          <div className="space-y-6">
            {!audioBlob ? (
              <div>
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`btn-primary text-lg px-8 py-4 rounded-full flex items-center mx-auto ${
                    isRecording ? 'bg-red-600 hover:bg-red-700' : ''
                  }`}
                >
                  {isRecording ? (
                    <>
                      <Square className="w-6 h-6 mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="w-6 h-6 mr-2" />
                      Start Recording
                    </>
                  )}
                </button>
                
                {isRecording && (
                  <div className="mt-4 text-center">
                    <p className="text-lg font-mono text-gray-600 dark:text-gray-400">
                      {formatTime(recordingDuration)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Recording in progress...
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={playRecording}
                    className="btn-secondary flex items-center"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-5 h-5 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Play
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={resetRecording}
                    className="btn-secondary"
                  >
                    Record Again
                  </button>
                </div>
                
                <button
                  onClick={analyzeRecording}
                  disabled={isAnalyzing}
                  className="btn-primary text-lg px-8 py-4 rounded-full flex items-center mx-auto"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    'Stop & Analyze'
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Audio Element */}
          {audioUrl && (
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          )}
        </div>

        {/* Tips */}
        <div className="mt-8 card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recording Tips
          </h3>
          <ul className="text-gray-600 dark:text-gray-400 space-y-2">
            <li>• Find a quiet environment with minimal background noise</li>
            <li>• Speak clearly and at a comfortable pace</li>
            <li>• Maintain a consistent distance from your microphone</li>
            <li>• Practice speaking for 30-60 seconds for best results</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PerformanceStudio;
