// Audio utility functions for SpeakWise

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const formatDuration = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  return formatTime(seconds);
};

export const getAudioContext = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  return new AudioContext();
};

export const createAudioAnalyzer = (stream) => {
  const audioContext = getAudioContext();
  const analyser = audioContext.createAnalyser();
  const microphone = audioContext.createMediaStreamSource(stream);
  
  microphone.connect(analyser);
  analyser.fftSize = 256;
  
  return {
    analyser,
    audioContext,
    dataArray: new Uint8Array(analyser.frequencyBinCount)
  };
};

export const getVolumeLevel = (analyser, dataArray) => {
  analyser.getByteFrequencyData(dataArray);
  const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
  return Math.round(average);
};

export const getSupportedAudioFormats = () => {
  const audio = document.createElement('audio');
  const formats = {
    webm: audio.canPlayType('audio/webm') !== '',
    mp3: audio.canPlayType('audio/mpeg') !== '',
    wav: audio.canPlayType('audio/wav') !== '',
    ogg: audio.canPlayType('audio/ogg') !== ''
  };
  
  return Object.keys(formats).filter(format => formats[format]);
};

export const validateAudioFile = (file) => {
  const allowedTypes = [
    'audio/wav',
    'audio/mp3',
    'audio/mpeg',
    'audio/webm',
    'audio/ogg'
  ];
  
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Only audio files are allowed.' };
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: 'File size too large. Maximum size is 10MB.' };
  }
  
  return { valid: true };
};

export const createAudioBlob = (chunks, mimeType = 'audio/webm') => {
  return new Blob(chunks, { type: mimeType });
};

export const downloadAudio = (blob, filename = 'recording.webm') => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const playAudio = (audioBlob) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    const url = URL.createObjectURL(audioBlob);
    
    audio.src = url;
    audio.onended = () => {
      URL.revokeObjectURL(url);
      resolve();
    };
    audio.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to play audio'));
    };
    
    audio.play();
  });
};

export const getAudioDuration = (audioBlob) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    const url = URL.createObjectURL(audioBlob);
    
    audio.src = url;
    audio.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      resolve(audio.duration);
    };
    audio.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load audio metadata'));
    };
  });
};
