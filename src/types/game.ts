export interface GameRound {
  id: number;
  image: string;
  label: 'real' | 'phishing';
  title: string;
  explanation: string;
  indicators: string[];
}

export interface GameState {
  currentRound: number;
  score: number;
  answers: Answer[];
  gameComplete: boolean;
  showFeedback: boolean;
  currentAnswer: 'real' | 'phishing' | null;
  isCorrect: boolean | null;
}

export interface Answer {
  roundId: number;
  userAnswer: 'real' | 'phishing';
  correctAnswer: 'real' | 'phishing';
  isCorrect: boolean;
  timeSpent: number;
}

export interface GameStats {
  totalRounds: number;
  correctAnswers: number;
  accuracy: number;
  totalScore: number;
  averageTime: number;
}
