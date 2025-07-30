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
    symbol: string;
    atomic_number: number;
    atomic_weight?: string;
    category: ElementCategory | { key: string; value: string };
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

// Element category types
export type ElementCategory = 
  | 'alkali_metal'
  | 'alkaline_earth_metal'
  | 'transition_metal'
  | 'post_transition_metal'
  | 'metalloid'
  | 'nonmetal'
  | 'halogen'
  | 'noble_gas'
  | 'lanthanide'
  | 'actinide';

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

// Category color mapping
export const CATEGORY_COLORS: Record<ElementCategory, string> = {
  'alkali_metal': '#ff6b6b',
  'alkaline_earth_metal': '#4ecdc4',
  'transition_metal': '#45b7d1',
  'post_transition_metal': '#96ceb4',
  'metalloid': '#feca57',
  'nonmetal': '#ff9ff3',
  'halogen': '#54a0ff',
  'noble_gas': '#5f27cd',
  'lanthanide': '#00d2d3',
  'actinide': '#ff9f43',
};

// Category display names
export const CATEGORY_NAMES: Record<ElementCategory, string> = {
  'alkali_metal': 'Alkali Metals',
  'alkaline_earth_metal': 'Alkaline Earth Metals',
  'transition_metal': 'Transition Metals',
  'post_transition_metal': 'Post-transition Metals',
  'metalloid': 'Metalloids',
  'nonmetal': 'Nonmetals',
  'halogen': 'Halogens',
  'noble_gas': 'Noble Gases',
  'lanthanide': 'Lanthanides',
  'actinide': 'Actinides',
};