// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Element interface for periodic table data
export interface Element extends CosmicObject {
  type: 'elements';
  metadata: {
    element_name: string;
    symbol: string;
    atomic_number: number;
    category: ElementCategory | { key: string; value: string };
    can_i_lick_it?: LickabilityRating | { key: string; value: string };
    atomic_weight?: string;
    electron_configuration?: string;
    melting_point?: number;
    boiling_point?: number;
    density?: number;
    discovery_year?: number;
    description?: string;
    uses?: string;
    properties?: string;
    period?: number;
    group?: number;
    block?: string;
    state?: ElementState | { key: string; value: string };
    color_code?: string;
  };
}

// Category interface for element groupings
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    color?: string;
    description?: string;
  };
}

// Lickability rating types based on Cosmic data
export type LickabilityRating = 
  | 'sure_probably_fine'
  | 'maybe_not_good_idea'
  | 'you_really_shouldnt'
  | 'please_reconsider';

// Lickability display values
export const LICKABILITY_OPTIONS: Record<string, { 
  value: string; 
  color: string; 
  emoji: string;
  description: string;
}> = {
  'Sure, it\'s probably fine': { 
    value: 'Sure, it\'s probably fine', 
    color: '#22c55e', 
    emoji: '✅',
    description: 'Generally safe elements that won\'t cause immediate harm'
  },
  'Maybe not a good idea': { 
    value: 'Maybe not a good idea', 
    color: '#eab308', 
    emoji: '⚠️',
    description: 'Proceed with caution - not recommended but not immediately deadly'
  },
  'You really shouldn\'t': { 
    value: 'You really shouldn\'t', 
    color: '#f97316', 
    emoji: '🚨',
    description: 'Definitely not recommended - could cause serious harm'
  },
  'Please reconsider': { 
    value: 'Please reconsider', 
    color: '#ef4444', 
    emoji: '☠️',
    description: 'Absolutely do not attempt - potentially lethal'
  }
};

// Game state interfaces
export interface GameState {
  score: number;
  streak: number;
  totalGuesses: number;
  correctGuesses: number;
  currentElement: Element | null;
  gameMode: 'explore' | 'guess';
  achievements: Achievement[];
  guessedElements: Set<string>;
}

export interface GuessResult {
  isCorrect: boolean;
  userGuess: string;
  actualRating: string;
  pointsEarned: number;
  newStreak: number;
  achievementUnlocked?: Achievement;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlockedAt?: Date;
  condition: (gameState: GameState, element?: Element) => boolean;
}

// Element category types based on the Cosmic data
export type ElementCategory = 
  | 'reactive_nonmetal'
  | 'noble_gas'
  | 'alkali_metal'
  | 'alkaline_earth_metal'
  | 'metalloid'
  | 'halogen'
  | 'post_transition_metal'
  | 'transition_metal'
  | 'lanthanide'
  | 'actinide'
  | 'transition_metal_predicted'
  | 'post_transition_metal_predicted'
  | 'unknown_synthetic'
  | 'halogen_predicted'
  | 'noble_gas_predicted';

// Element state types
export type ElementState = 
  | 'solid'
  | 'liquid'
  | 'gas'
  | 'unknown';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Component prop types
export interface ElementCardProps {
  element: Element;
  onClick?: (element: Element) => void;
  className?: string;
  showLickabilityBadge?: boolean;
}

export interface PeriodicTableProps {
  elements: Element[];
  onElementClick?: (element: Element) => void;
  selectedCategory?: string | null;
  searchTerm?: string;
  gameMode?: 'explore' | 'guess';
}

export interface ElementModalProps {
  element: Element | null;
  isOpen: boolean;
  onClose: () => void;
  gameMode?: 'explore' | 'guess';
}

export interface LickGuessModalProps {
  element: Element | null;
  isOpen: boolean;
  onClose: () => void;
  onGuess: (guess: string) => void;
  gameState: GameState;
}

export interface GameStatsProps {
  gameState: GameState;
  onToggleMode: (mode: 'explore' | 'guess') => void;
  onResetGame: () => void;
}

export interface LickabilityBadgeProps {
  rating: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

// Type guards
export function isElement(obj: CosmicObject): obj is Element {
  return obj.type === 'elements';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

// Utility functions for lickability
export function getLickabilityInfo(element: Element) {
  const rating = typeof element.metadata.can_i_lick_it === 'object'
    ? element.metadata.can_i_lick_it?.value || 'Unknown'
    : element.metadata.can_i_lick_it || 'Unknown';
    
  return LICKABILITY_OPTIONS[rating] || {
    value: 'Unknown',
    color: '#6b7280',
    emoji: '❓',
    description: 'Safety information not available'
  };
}

export function getLickabilityScore(rating: string): number {
  const scores: Record<string, number> = {
    'Sure, it\'s probably fine': 1,
    'Maybe not a good idea': 2,
    'You really shouldn\'t': 3,
    'Please reconsider': 4
  };
  return scores[rating] || 0;
}

// Utility types
export type CreateElementData = Omit<Element, 'id' | 'created_at' | 'modified_at'>;

// Element position calculation for periodic table layout
export interface ElementPosition {
  period: number;
  group: number;
  element: Element;
}

// Category color mapping based on actual Cosmic categories
export const CATEGORY_COLORS: Record<string, string> = {
  'Reactive nonmetal': '#ff6b6b',
  'Noble gas': '#5f27cd',
  'Alkali metal': '#ff9ff3',
  'Alkaline earth metal': '#4ecdc4',
  'Metalloid': '#feca57',
  'Halogen': '#54a0ff',
  'Post-transition metal': '#96ceb4',
  'Transition metal': '#45b7d1',
  'Lanthanide': '#00d2d3',
  'Actinide': '#ff9f43',
  'Transition metal (predicted)': '#74b9ff',
  'Post-transition metal (predicted)': '#a29bfe',
  'Unknown / Synthetic': '#6c5ce7',
  'Halogen (predicted)': '#0984e3',
  'Noble gas (predicted)': '#8e44ad',
};

// Default color for unknown categories
export const DEFAULT_ELEMENT_COLOR = '#6b7280';