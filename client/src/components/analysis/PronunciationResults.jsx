import React from 'react';
import styled from 'styled-components';

const ResultsContainer = styled.div`
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin: 20px 0;
`;

const ScoreSection = styled.div`
  margin: 15px 0;
`;

const ScoreTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 10px;
`;

const ScoreBar = styled.div`
  width: 100%;
  height: 20px;
  background: #eee;
  border-radius: 10px;
  overflow: hidden;
`;

const ScoreFill = styled.div`
  width: ${props => props.score}%;
  height: 100%;
  background: ${props => {
    if (props.score >= 80) return '#27ae60';
    if (props.score >= 60) return '#f1c40f';
    return '#e74c3c';
  }};
  transition: width 0.5s ease-in-out;
`;

const PhonemeList = styled.div`
  margin-top: 15px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 5px;
`;

const PhonemeItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  padding: 10px;
  background: #ffeaea;
  border-radius: 5px;
  margin-top: 10px;
`;

const PronunciationResults = ({ results }) => {
  if (!results) return null;

  const {
    accuracyScore,
    fluencyScore,
    completenessScore,
    prosodyScore,
    pronScore,
    words = []
  } = results;

  return (
    <ResultsContainer>
      <h2>Pronunciation Assessment Results</h2>
      
      <ScoreSection>
        <ScoreTitle>Overall Pronunciation Score</ScoreTitle>
        <ScoreBar>
          <ScoreFill score={pronScore} />
        </ScoreBar>
        <p>{pronScore.toFixed(1)}/100</p>
      </ScoreSection>

      <ScoreSection>
        <ScoreTitle>Detailed Scores</ScoreTitle>
        <div>
          <p>Accuracy: {accuracyScore.toFixed(1)}/100</p>
          <ScoreBar>
            <ScoreFill score={accuracyScore} />
          </ScoreBar>
        </div>
        
        <div>
          <p>Fluency: {fluencyScore.toFixed(1)}/100</p>
          <ScoreBar>
            <ScoreFill score={fluencyScore} />
          </ScoreBar>
        </div>

        {completenessScore && (
          <div>
            <p>Completeness: {completenessScore.toFixed(1)}/100</p>
            <ScoreBar>
              <ScoreFill score={completenessScore} />
            </ScoreBar>
          </div>
        )}

        {prosodyScore && (
          <div>
            <p>Prosody: {prosodyScore.toFixed(1)}/100</p>
            <ScoreBar>
              <ScoreFill score={prosodyScore} />
            </ScoreBar>
          </div>
        )}
      </ScoreSection>

      {words.length > 0 && (
        <ScoreSection>
          <ScoreTitle>Word-level Analysis</ScoreTitle>
          {words.map((word, index) => (
            <PhonemeList key={index}>
              <h4>{word.word}</h4>
              <PhonemeItem>
                <span>Accuracy: {word.accuracyScore.toFixed(1)}</span>
                {word.errorType !== 'None' && (
                  <ErrorMessage>{word.errorType}</ErrorMessage>
                )}
              </PhonemeItem>
              {word.phonemes && (
                <div>
                  <p>Phonemes:</p>
                  {word.phonemes.map((phoneme, pIndex) => (
                    <PhonemeItem key={pIndex}>
                      <span>{phoneme.phoneme}</span>
                      <span>Score: {phoneme.accuracyScore.toFixed(1)}</span>
                    </PhonemeItem>
                  ))}
                </div>
              )}
            </PhonemeList>
          ))}
        </ScoreSection>
      )}
    </ResultsContainer>
  );
};

export default PronunciationResults;