'use client';

import { useState } from 'react';
import { Element, Category, GuessResult } from '@/types';
import { useGameState } from '@/hooks/useGameState';
import { getLickabilityExplanation } from '@/lib/gameLogic';
import PeriodicTable from '@/components/PeriodicTable';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import ElementModal from '@/components/ElementModal';
import LickGuessModal from '@/components/LickGuessModal';
import GameStats from '@/components/GameStats';

interface PeriodicTableContainerProps {
  elements: Element[];
  categories: Category[];
}

export default function PeriodicTableContainer({ 
  elements, 
  categories 
}: PeriodicTableContainerProps) {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showGuessModal, setShowGuessModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [lastGuessResult, setLastGuessResult] = useState<GuessResult | null>(null);
  
  const {
    gameState,
    toggleGameMode,
    makeGuess,
    resetGame,
    hasGuessedElement
  } = useGameState();

  // Filter elements based on search and category
  const filteredElements = elements.filter(element => {
    const matchesSearch = !searchTerm || 
      element.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.metadata.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.metadata.atomic_number.toString().includes(searchTerm);

    const matchesCategory = !selectedCategory || 
      (typeof element.metadata.category === 'object' 
        ? element.metadata.category.value === selectedCategory
        : element.metadata.category === selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const handleElementClick = (element: Element) => {
    const lickabilityRating = typeof element.metadata.can_i_lick_it === 'object'
      ? element.metadata.can_i_lick_it?.value || ''
      : element.metadata.can_i_lick_it || '';

    if (gameState.gameMode === 'guess') {
      // In game mode, check if element has lickability data and hasn't been guessed
      if (!lickabilityRating || lickabilityRating === '') {
        return; // Element doesn't have lickability data
      }
      
      if (hasGuessedElement(element.id)) {
        // Already guessed, show the result directly
        setSelectedElement(element);
        setShowResultModal(true);
      } else {
        // Show guess modal
        setSelectedElement(element);
        setShowGuessModal(true);
      }
    } else {
      // In explore mode, show element info directly
      setSelectedElement(element);
      setShowResultModal(true);
    }
  };

  const handleGuess = (guess: string) => {
    if (!selectedElement) return;
    
    const result = makeGuess(selectedElement, guess);
    setLastGuessResult(result);
    setShowGuessModal(false);
    setShowResultModal(true);
  };

  const handleCloseModal = () => {
    setSelectedElement(null);
    setShowResultModal(false);
    setShowGuessModal(false);
    setLastGuessResult(null);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <>
      <div className="space-y-8">
        <GameStats 
          gameState={gameState}
          onToggleMode={toggleGameMode}
          onResetGame={resetGame}
        />

        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          placeholder="Search elements by name, symbol, or atomic number..."
        />

        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <PeriodicTable 
          elements={filteredElements}
          onElementClick={handleElementClick}
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
          gameMode={gameState.gameMode}
          guessedElements={gameState.guessedElements}
        />
      </div>

      {/* Guess Modal - For making guesses in game mode */}
      <LickGuessModal 
        element={selectedElement}
        isOpen={showGuessModal}
        onClose={handleCloseModal}
        onGuess={handleGuess}
        gameState={gameState}
      />

      {/* Result Modal - Shows element info and/or guess results */}
      {selectedElement && (
        <ElementModal 
          element={selectedElement}
          isOpen={showResultModal}
          onClose={handleCloseModal}
          gameMode={gameState.gameMode}
          guessResult={lastGuessResult}
          explanation={getLickabilityExplanation(selectedElement)}
        />
      )}
    </>
  );
}