import React from 'react';
import { GameRound } from '../types/game';

interface TileCardProps {
  round: GameRound;
  onAnswer: (answer: 'real' | 'phishing') => void;
  disabled: boolean;
  showFeedback: boolean;
  userAnswer: 'real' | 'phishing' | null;
  isCorrect: boolean | null;
}

const TileCard: React.FC<TileCardProps> = ({
  round,
  onAnswer,
  disabled,
  showFeedback,
  userAnswer,
  isCorrect
}) => {
  const getButtonClass = (buttonType: 'real' | 'phishing') => {
    if (!showFeedback) {
      return 'bg-blue-500 hover:bg-blue-600 text-white';
    }
    
    if (userAnswer === buttonType) {
      return isCorrect 
        ? 'bg-green-500 text-white' 
        : 'bg-red-500 text-white';
    }
    
    if (round.label === buttonType && !isCorrect) {
      return 'bg-green-500 text-white';
    }
    
    return 'bg-gray-300 text-gray-600 cursor-not-allowed';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md mx-auto">
      <div className="relative">
        <img
          src={process.env.PUBLIC_URL + round.image}
          alt={round.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback for missing images
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NzM4NyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
          }}
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          {round.title}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Is this website real or phishing?
        </h3>
        
        <div className="flex gap-3">
          <button
            onClick={() => onAnswer('real')}
            disabled={disabled}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${getButtonClass('real')}`}
          >
            Real
          </button>
          <button
            onClick={() => onAnswer('phishing')}
            disabled={disabled}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${getButtonClass('phishing')}`}
          >
            Phishing
          </button>
        </div>
        
        {showFeedback && (
          <div className={`mt-4 p-3 rounded-lg ${
            isCorrect ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'
          }`}>
            <p className={`font-semibold ${
              isCorrect ? 'text-green-800' : 'text-red-800'
            }`}>
              {isCorrect ? 'Correct!' : 'Incorrect!'}
            </p>
            <p className="text-sm mt-1 text-gray-700">
              {round.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TileCard;
