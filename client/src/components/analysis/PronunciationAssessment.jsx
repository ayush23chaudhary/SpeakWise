import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';
import PronunciationResults from './PronunciationResults';
import Button from '../common/Button';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';

const Container = styled(Card)`
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
`;

const TextInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin: 15px 0;
`;

const StatusMessage = styled.div`
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  text-align: center;
  background: ${props => props.isError ? '#ffeaea' : '#e3f2fd'};
  color: ${props => props.isError ? '#e74c3c' : '#2196f3'};
`;

const PronunciationAssessment = () => {
  const [referenceText, setReferenceText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [recognizer, setRecognizer] = useState(null);

  useEffect(() => {
    return () => {
      if (recognizer) {
        recognizer.close();
      }
    };
  }, [recognizer]);

  const initializeSpeechRecognizer = () => {
    // Replace with your Azure Speech Service credentials
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
      process.env.REACT_APP_AZURE_SPEECH_KEY,
      process.env.REACT_APP_AZURE_SPEECH_REGION
    );
    
    speechConfig.speechRecognitionLanguage = 'en-US';
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    
    const speechRecognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
    
    // Create pronunciation assessment config
    const pronunciationAssessmentConfig = new SpeechSDK.PronunciationAssessmentConfig(
      referenceText,
      SpeechSDK.PronunciationAssessmentGradingSystem.HundredMark,
      SpeechSDK.PronunciationAssessmentGranularity.Phoneme,
      true
    );

    pronunciationAssessmentConfig.enableProsodyAssessment();
    pronunciationAssessmentConfig.applyTo(speechRecognizer);

    return speechRecognizer;
  };

  const startRecording = async () => {
    if (!referenceText.trim()) {
      setError('Please enter reference text first');
      return;
    }

    try {
      setError(null);
      setStatus('Starting recording...');
      setIsRecording(true);

      const speechRecognizer = initializeSpeechRecognizer();
      setRecognizer(speechRecognizer);

      speechRecognizer.recognized = (s, e) => {
        if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
          const pronunciationAssessmentResult = SpeechSDK.PronunciationAssessmentResult.fromResult(e.result);
          setResults(pronunciationAssessmentResult);
          setStatus('Assessment complete');
          stopRecording();
        }
      };

      speechRecognizer.recognizeOnceAsync(
        result => {
          if (result.reason === SpeechSDK.ResultReason.Canceled) {
            const cancellation = SpeechSDK.CancellationDetails.fromResult(result);
            setError(`Recognition canceled: ${cancellation.reason}`);
          }
        },
        error => {
          setError(`Error occurred: ${error}`);
          stopRecording();
        }
      );

    } catch (err) {
      setError(`Failed to start recording: ${err.message}`);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognizer) {
      recognizer.stopContinuousRecognitionAsync();
      recognizer.close();
      setRecognizer(null);
    }
    setIsRecording(false);
  };

  return (
    <Container>
      <h2>Pronunciation Assessment</h2>
      
      <div>
        <label>Reference Text:</label>
        <TextInput
          value={referenceText}
          onChange={(e) => setReferenceText(e.target.value)}
          placeholder="Enter the text you want to practice pronouncing..."
          disabled={isRecording}
        />
      </div>

      <ButtonGroup>
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={!referenceText.trim() && !isRecording}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Button>
      </ButtonGroup>

      {status && <StatusMessage>{status}</StatusMessage>}
      {error && <StatusMessage isError>{error}</StatusMessage>}
      {isRecording && <LoadingSpinner />}

      {results && <PronunciationResults results={results} />}
    </Container>
  );
};

export default PronunciationAssessment;