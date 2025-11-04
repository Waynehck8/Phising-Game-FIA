import React, { useState } from 'react';
import TileCard from './TileCard';
import { GameRound, GameState, Answer } from '../types/game';
import gameData from '../data/rounds.json';

interface GameGridProps {
  onGameComplete: (stats: any) => void;
}

const GameGrid: React.FC<GameGridProps> = ({ onGameComplete }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentRound: 0,
    score: 0,
    answers: [],
    gameComplete: false,
    showFeedback: false,
    currentAnswer: null,
    isCorrect: null
  });

  const [startTime, setStartTime] = useState<number>(Date.now());

  const handleAnswer = (answer: 'real' | 'phishing') => {
    const currentRoundData = gameData[gameState.currentRound] as GameRound;
    const isCorrect = answer === currentRoundData.label;
    const timeSpent = Date.now() - startTime;
    
    // Calculate points
    let points = isCorrect ? 10 : -3;
    if (isCorrect && timeSpent < 5000) { // Bonus for fast answers under 5 seconds
      points += 5;
    }

    const newAnswer: Answer = {
      roundId: currentRoundData.id,
      userAnswer: answer,
      correctAnswer: currentRoundData.label,
      isCorrect,
      timeSpent
    };

    setGameState(prev => ({
      ...prev,
      score: prev.score + points,
      answers: [...prev.answers, newAnswer],
      showFeedback: true,
      currentAnswer: answer,
      isCorrect
    }));

    // Show feedback for 3 seconds, then move to next round
    setTimeout(() => {
      if (gameState.currentRound < gameData.length - 1) {
        setGameState(prev => ({
          ...prev,
          currentRound: prev.currentRound + 1,
          showFeedback: false,
          currentAnswer: null,
          isCorrect: null
        }));
        setStartTime(Date.now());
      } else {
        // Game complete
        const stats = {
          totalRounds: gameData.length,
          correctAnswers: [...gameState.answers, newAnswer].filter(a => a.isCorrect).length,
          accuracy: Math.round(([...gameState.answers, newAnswer].filter(a => a.isCorrect).length / gameData.length) * 100),
          totalScore: gameState.score + points,
          averageTime: Math.round([...gameState.answers, newAnswer].reduce((sum, a) => sum + a.timeSpent, 0) / gameData.length / 1000)
        };
        onGameComplete(stats);
      }
    }, 3000);
  };

  const currentRoundData = gameData[gameState.currentRound] as GameRound;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Round {gameState.currentRound + 1} of {gameData.length}
          </h2>
          <div className="text-right">
            <p className="text-lg font-semibold text-blue-600">
              Score: {gameState.score}
            </p>
            <p className="text-sm text-gray-600">
              {Math.round((gameState.currentRound / gameData.length) * 100)}% Complete
            </p>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((gameState.currentRound + 1) / gameData.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <TileCard
        round={currentRoundData}
        onAnswer={handleAnswer}
        disabled={gameState.showFeedback}
        showFeedback={gameState.showFeedback}
        userAnswer={gameState.currentAnswer}
        isCorrect={gameState.isCorrect}
      />
    </div>
  );
};

export default GameGrid;
