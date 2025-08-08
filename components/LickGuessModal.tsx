'use client';

import { LickGuessModalProps, LICKABILITY_OPTIONS } from '@/types';
import { useEffect } from 'react';

export default function LickGuessModal({ 
  element, 
  isOpen, 
  onClose, 
  onGuess,
  gameState 
}: LickGuessModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !element) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleGuess = (guess: string) => {
    onGuess(guess);
    onClose();
  };

  const lickabilityOptions = Object.values(LICKABILITY_OPTIONS);

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1"></div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            
            <div className="mb-4">
              <div className="text-4xl mb-2">{element.metadata.symbol}</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{element.title}</h2>
              <p className="text-gray-600">Atomic Number: {element.metadata.atomic_number}</p>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-4 mb-6">
              <h3 className="text-xl font-bold mb-2">🤔 Can You Lick It?</h3>
              <p className="text-lg">
                What do you think? Is <strong>{element.metadata.element_name}</strong> safe to lick?
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-gray-900 text-center mb-4">
              Make your guess:
            </h4>
            
            {lickabilityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleGuess(option.value)}
                className="w-full p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 
                         transition-all duration-200 flex items-center gap-3 group
                         hover:bg-gray-50 hover:shadow-md"
                style={{ 
                  '--hover-color': option.color 
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = option.color;
                  e.currentTarget.style.backgroundColor = option.color + '10';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: option.color }}
                >
                  {option.emoji}
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-gray-900">{option.value}</div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Game Progress Info */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="font-bold text-lg text-blue-600">{gameState.score}</div>
                <div className="text-gray-600">Score</div>
              </div>
              <div>
                <div className="font-bold text-lg text-orange-600">{gameState.streak}</div>
                <div className="text-gray-600">Streak</div>
              </div>
              <div>
                <div className="font-bold text-lg text-green-600">
                  {gameState.totalGuesses > 0 
                    ? Math.round((gameState.correctGuesses / gameState.totalGuesses) * 100)
                    : 0}%
                </div>
                <div className="text-gray-600">Accuracy</div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            💡 Tip: Consider the element's category and atomic properties!
          </div>
        </div>
      </div>
    </div>
  );
}