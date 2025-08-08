'use client';

import { ElementModalProps, CATEGORY_COLORS, DEFAULT_ELEMENT_COLOR, GuessResult } from '@/types';
import { useEffect } from 'react';
import LickabilityBadge from './LickabilityBadge';

interface ExtendedElementModalProps extends ElementModalProps {
  guessResult?: GuessResult | null;
  explanation?: string;
}

export default function ElementModal({ 
  element, 
  isOpen, 
  onClose, 
  gameMode = 'explore',
  guessResult,
  explanation
}: ExtendedElementModalProps) {
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

  const categoryValue = typeof element.metadata.category === 'string' 
    ? element.metadata.category 
    : element.metadata.category?.value || 'Unknown';
    
  const categoryColor = CATEGORY_COLORS[categoryValue] || DEFAULT_ELEMENT_COLOR;

  const lickabilityRating = typeof element.metadata.can_i_lick_it === 'object'
    ? element.metadata.can_i_lick_it?.value || ''
    : element.metadata.can_i_lick_it || '';

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl font-bold"
                style={{ backgroundColor: categoryColor }}
              >
                {element.metadata.symbol}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{element.title}</h2>
                <p className="text-gray-600">Atomic Number: {element.metadata.atomic_number}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          {/* Game Result Section */}
          {gameMode === 'guess' && guessResult && (
            <div className={`mb-6 p-4 rounded-lg ${
              guessResult.isCorrect 
                ? 'bg-green-100 border border-green-300' 
                : 'bg-red-100 border border-red-300'
            }`}>
              <div className="text-center">
                <div className="text-4xl mb-2">
                  {guessResult.isCorrect ? '🎉' : '😅'}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  guessResult.isCorrect ? 'text-green-800' : 'text-red-800'
                }`}>
                  {guessResult.isCorrect ? 'Correct!' : 'Not quite!'}
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Your guess:</span> {guessResult.userGuess}
                  </div>
                  <div>
                    <span className="font-medium">Actual rating:</span> {guessResult.actualRating}
                  </div>
                  <div className={`text-lg font-bold ${
                    guessResult.isCorrect ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    +{guessResult.pointsEarned} points
                    {guessResult.newStreak > 1 && ` (${guessResult.newStreak} streak!)`}
                  </div>
                </div>

                {guessResult.achievementUnlocked && (
                  <div className="mt-3 p-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg">
                    <div className="text-lg">🏆 Achievement Unlocked!</div>
                    <div className="font-bold">
                      {guessResult.achievementUnlocked.emoji} {guessResult.achievementUnlocked.title}
                    </div>
                    <div className="text-sm opacity-90">
                      {guessResult.achievementUnlocked.description}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Lickability Section */}
          {lickabilityRating && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">🤔 Can You Lick It?</h3>
              <div className="flex items-center gap-3 mb-3">
                <LickabilityBadge rating={lickabilityRating} size="lg" />
              </div>
              {explanation && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">{explanation}</p>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Basic Properties</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Symbol:</span>
                    <span className="font-medium">{element.metadata.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Atomic Number:</span>
                    <span className="font-medium">{element.metadata.atomic_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Element Name:</span>
                    <span className="font-medium">{element.metadata.element_name}</span>
                  </div>
                  {element.metadata.atomic_weight && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Atomic Weight:</span>
                      <span className="font-medium">{element.metadata.atomic_weight}</span>
                    </div>
                  )}
                  {element.metadata.period && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Period:</span>
                      <span className="font-medium">{element.metadata.period}</span>
                    </div>
                  )}
                  {element.metadata.group && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Group:</span>
                      <span className="font-medium">{element.metadata.group}</span>
                    </div>
                  )}
                </div>
              </div>

              {element.metadata.category && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Category</h3>
                  <span 
                    className="inline-block px-3 py-1 text-white rounded-full text-sm font-medium"
                    style={{ backgroundColor: categoryColor }}
                  >
                    {categoryValue}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {element.metadata.electron_configuration && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Electron Configuration</h3>
                  <p className="text-sm text-gray-700 font-mono bg-gray-100 p-2 rounded">
                    {element.metadata.electron_configuration}
                  </p>
                </div>
              )}

              {element.metadata.state && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">State at Room Temperature</h3>
                  <p className="text-sm text-gray-700">
                    {typeof element.metadata.state === 'object' 
                      ? element.metadata.state.value 
                      : element.metadata.state}
                  </p>
                </div>
              )}

              {element.metadata.discovery_year && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Discovery Year</h3>
                  <p className="text-sm text-gray-700">
                    {element.metadata.discovery_year > 0 
                      ? element.metadata.discovery_year 
                      : `${Math.abs(element.metadata.discovery_year)} BCE`}
                  </p>
                </div>
              )}

              {(element.metadata.melting_point || element.metadata.boiling_point || element.metadata.density) && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Physical Properties</h3>
                  <div className="space-y-1 text-sm">
                    {element.metadata.melting_point && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Melting Point:</span>
                        <span className="font-medium">{element.metadata.melting_point}°C</span>
                      </div>
                    )}
                    {element.metadata.boiling_point && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Boiling Point:</span>
                        <span className="font-medium">{element.metadata.boiling_point}°C</span>
                      </div>
                    )}
                    {element.metadata.density && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Density:</span>
                        <span className="font-medium">{element.metadata.density} g/cm³</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {element.metadata.description && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{element.metadata.description}</p>
            </div>
          )}

          {element.metadata.uses && (
            <div className="mt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Uses</h3>
              <p className="text-gray-700 leading-relaxed">{element.metadata.uses}</p>
            </div>
          )}

          {element.metadata.properties && (
            <div className="mt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Properties</h3>
              <p className="text-gray-700 leading-relaxed">{element.metadata.properties}</p>
            </div>
          )}

          {/* Safety Disclaimer */}
          {lickabilityRating && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-2">
                <span className="text-yellow-600 text-lg">⚠️</span>
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-1">Safety Disclaimer</h4>
                  <p className="text-yellow-700 text-sm">
                    This is an educational game for entertainment purposes only. 
                    DO NOT actually attempt to lick any chemical elements. 
                    Always follow proper laboratory safety protocols when handling chemicals.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}