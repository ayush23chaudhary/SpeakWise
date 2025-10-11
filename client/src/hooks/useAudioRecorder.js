import { useState, useRef, useCallback } from 'react';
import { createAudioAnalyzer, getVolumeLevel, formatTime } from '../utils/audioUtils';

const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [volume, setVolume] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(null);

  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const audioAnalyzerRef = useRef(null);
  const startTimeRef = useRef(null);
  const durationIntervalRef = useRef(null);
  const volumeIntervalRef = useRef(null);

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
      };
      
      mediaRecorder.onerror = (event) => {
        setError('Recording error occurred');
        console.error('MediaRecorder error:', event);
      };
      
      // Start recording
      mediaRecorder.start(100); // Collect data every 100ms
      setIsRecording(true);
      setIsPaused(false);
      startTimeRef.current = Date.now();
      
      // Start duration timer
      durationIntervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          setDuration(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }
      }, 1000);
      
      // Start volume monitoring
      const analyzer = createAudioAnalyzer(stream);
      audioAnalyzerRef.current = analyzer;
      
      const updateVolume = () => {
        if (isRecording && !isPaused) {
          const currentVolume = getVolumeLevel(analyzer.analyser, analyzer.dataArray);
          setVolume(currentVolume);
          volumeIntervalRef.current = requestAnimationFrame(updateVolume);
        }
      };
      
      updateVolume();
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setError('Unable to access microphone. Please check your permissions.');
    }
  }, [isRecording, isPaused]);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      
      if (volumeIntervalRef.current) {
        cancelAnimationFrame(volumeIntervalRef.current);
      }
    }
  }, [isRecording, isPaused]);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      
      // Resume volume monitoring
      if (audioAnalyzerRef.current) {
        const updateVolume = () => {
          if (isRecording && !isPaused) {
            const currentVolume = getVolumeLevel(
              audioAnalyzerRef.current.analyser, 
              audioAnalyzerRef.current.dataArray
            );
            setVolume(currentVolume);
            volumeIntervalRef.current = requestAnimationFrame(updateVolume);
          }
        };
        updateVolume();
      }
    }
  }, [isRecording, isPaused]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      
      // Stop all streams
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      // Clear intervals
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
      
      if (volumeIntervalRef.current) {
        cancelAnimationFrame(volumeIntervalRef.current);
      }
      
      // Close audio context
      if (audioAnalyzerRef.current) {
        audioAnalyzerRef.current.audioContext.close();
      }
      
      setIsRecording(false);
      setIsPaused(false);
    }
  }, [isRecording]);

  const resetRecording = useCallback(() => {
    setAudioBlob(null);
    setAudioUrl(null);
    setVolume(0);
    setDuration(0);
    setError(null);
    setIsRecording(false);
    setIsPaused(false);
    
    // Clear any existing intervals
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
    }
    
    if (volumeIntervalRef.current) {
      cancelAnimationFrame(volumeIntervalRef.current);
    }
  }, []);

  const getFormattedDuration = useCallback(() => {
    return formatTime(duration);
  }, [duration]);

  return {
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
  };
};

export default useAudioRecorder;
