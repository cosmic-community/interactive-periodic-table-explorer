'use client';

import { useState, useCallback, useEffect } from 'react';
import { GameState, Achievement, Element, GuessResult } from '@/types';
import { checkAchievements } from '@/lib/gameLogic';

const INITIAL_GAME_STATE: GameState = {
  score: 0,
  streak: 0,
  totalGuesses: 0,
  correctGuesses: 0,
  currentElement: null,
  gameMode: 'explore',
  achievements: [],
  guessedElements: new Set()
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);

  // Load game state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('can-you-lick-it-game-state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        // Convert guessedElements array back to Set
        if (parsed.guessedElements) {
          parsed.guessedElements = new Set(parsed.guessedElements);
        }
        setGameState({ ...INITIAL_GAME_STATE, ...parsed });
      } catch (error) {
        console.error('Error loading game state:', error);
      }
    }
  }, []);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    // Convert Set to array for JSON serialization
    const stateToSave = {
      ...gameState,
      guessedElements: Array.from(gameState.guessedElements)
    };
    localStorage.setItem('can-you-lick-it-game-state', JSON.stringify(stateToSave));
  }, [gameState]);

  const toggleGameMode = useCallback((mode: 'explore' | 'guess') => {
    setGameState(prev => ({ ...prev, gameMode: mode }));
  }, []);

  const setCurrentElement = useCallback((element: Element | null) => {
    setGameState(prev => ({ ...prev, currentElement: element }));
  }, []);

  const makeGuess = useCallback((element: Element, userGuess: string): GuessResult => {
    const actualRating = typeof element.metadata.can_i_lick_it === 'object'
      ? element.metadata.can_i_lick_it?.value || 'Unknown'
      : element.metadata.can_i_lick_it || 'Unknown';

    const isCorrect = userGuess === actualRating;
    const basePoints = isCorrect ? 10 : 0;
    const streakBonus = isCorrect ? gameState.streak * 2 : 0;
    const pointsEarned = basePoints + streakBonus;
    const newStreak = isCorrect ? gameState.streak + 1 : 0;

    // Update game state
    const newGameState: GameState = {
      ...gameState,
      score: gameState.score + pointsEarned,
      streak: newStreak,
      totalGuesses: gameState.totalGuesses + 1,
      correctGuesses: gameState.correctGuesses + (isCorrect ? 1 : 0),
      guessedElements: new Set([...gameState.guessedElements, element.id])
    };

    // Check for achievements
    const newAchievement = checkAchievements(newGameState, element);
    if (newAchievement) {
      newGameState.achievements = [...gameState.achievements, newAchievement];
    }

    setGameState(newGameState);

    return {
      isCorrect,
      userGuess,
      actualRating,
      pointsEarned,
      newStreak,
      achievementUnlocked: newAchievement
    };
  }, [gameState]);

  const resetGame = useCallback(() => {
    const resetState = {
      ...INITIAL_GAME_STATE,
      gameMode: gameState.gameMode // Preserve current game mode
    };
    setGameState(resetState);
    localStorage.removeItem('can-you-lick-it-game-state');
  }, [gameState.gameMode]);

  const getAccuracy = useCallback((): number => {
    if (gameState.totalGuesses === 0) return 0;
    return Math.round((gameState.correctGuesses / gameState.totalGuesses) * 100);
  }, [gameState.correctGuesses, gameState.totalGuesses]);

  const hasGuessedElement = useCallback((elementId: string): boolean => {
    return gameState.guessedElements.has(elementId);
  }, [gameState.guessedElements]);

  return {
    gameState,
    toggleGameMode,
    setCurrentElement,
    makeGuess,
    resetGame,
    getAccuracy,
    hasGuessedElement
  };
}