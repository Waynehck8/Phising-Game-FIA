import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameGrid from './components/GameGrid';
import EndScreen from './components/EndScreen';
import { GameStats } from './types/game';

// Edited to trigger reload

type GamePhase = 'start' | 'playing' | 'end';

function App() {
  const [gamePhase, setGamePhase] = useState<GamePhase>('start');
  const [gameStats, setGameStats] = useState<GameStats | null>(null);

  const handleStartGame = () => {
    setGamePhase('playing');
  };

  const handleGameComplete = (stats: GameStats) => {
    setGameStats(stats);
    setGamePhase('end');
  };

  const handlePlayAgain = () => {
    setGamePhase('playing');
  };

  return (
    <div className="App">
      {gamePhase === 'start' && (
        <StartScreen onStartGame={handleStartGame} />
      )}
      
      {gamePhase === 'playing' && (
        <GameGrid onGameComplete={handleGameComplete} />
      )}
      
      {gamePhase === 'end' && gameStats && (
        <EndScreen stats={gameStats} onPlayAgain={handlePlayAgain} />
      )}
    </div>
  );
}

export default App;
