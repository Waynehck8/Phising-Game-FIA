import React, { useState } from 'react';
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
  const [showModal, setShowModal] = useState(false);

  const getButtonClass = (buttonType: 'real' | 'phishing') => {
    if (!showFeedback) {
      return 'bg-blue-600 hover:bg-blue-700 text-white';
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

  // full image url (served from public/)
  const imageUrl = process.env.PUBLIC_URL + round.image;

  return (
    <>
      {/* Card: made wider (max-w-4xl) so image has space */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl mx-auto">
        <div className="relative bg-gray-50">
          {/* Image: larger height, object-contain so URL bar is visible and not cropped */}
          <img
            src={imageUrl}
            alt={round.title}
            className="w-full h-[420px] sm:h-[520px] md:h-[640px] lg:h-[760px] object-contain bg-white"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NzM4NyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
            }}
          />

          {/* title badge */}
          <div className="absolute top-3 left-3 bg-black bg-opacity-55 text-white px-3 py-1 rounded text-sm sm:text-base">
            {round.title}
          </div>

          {/* small control to open zoom */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="bg-white bg-opacity-90 hover:bg-opacity-100 text-sm sm:text-base px-3 py-1 rounded shadow"
              aria-label="Zoom image"
              type="button"
            >
              Zoom
            </button>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl sm:text-2xl font-bold mb-5 text-gray-800">
            Trang web này là thật hay giả mạo (phishing)?
          </h3>

          {/* Buttons: bigger paddings and font for easier clicking on touch devices */}
          <div className="flex gap-4">
            <button
              onClick={() => onAnswer('real')}
              disabled={disabled}
              className={`flex-1 py-4 px-6 rounded-xl text-lg font-semibold transition-colors ${getButtonClass('real')}`}
            >
              Thật
            </button>
            <button
              onClick={() => onAnswer('phishing')}
              disabled={disabled}
              className={`flex-1 py-4 px-6 rounded-xl text-lg font-semibold transition-colors ${getButtonClass('phishing')}`}
            >
              Giả mạo
            </button>
          </div>

          {/* Feedback block */}
          {showFeedback && (
            <div className={`mt-6 p-4 rounded-lg ${
              isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? 'Chính xác!' : 'Không chính xác!'}
              </p>
              <p className="text-sm mt-2 text-gtext-gray-800 text-lg md:text-xl leading-relaxed mt-6 max-w-3xl mx-auto text-centerray-700 whitespace-pre-wrap">
                {round.explanation}
              </p>
            </div>
          )}

          {/* Helpful hint: show image file (so instructor/player can know screenshot source) */}

        </div>
      </div>

      {/* Modal for zoomed image */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-lg overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 border-b">
              <div className="text-sm sm:text-base font-semibold">{round.title}</div>
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
                aria-label="Close zoom"
                type="button"
              >
                Close
              </button>
            </div>

            <div className="p-4 flex justify-center">
              <img
                src={imageUrl}
                alt={round.title}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>

            {/* optional explanation under big image */}
          </div>
        </div>
      )}
    </>
  );
};

export default TileCard;
