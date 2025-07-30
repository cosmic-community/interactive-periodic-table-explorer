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
}

export interface PeriodicTableProps {
  elements: Element[];
  onElementClick?: (element: Element) => void;
  selectedCategory?: string | null;
  searchTerm?: string;
}

export interface ElementModalProps {
  element: Element | null;
  isOpen: boolean;
  onClose: () => void;
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