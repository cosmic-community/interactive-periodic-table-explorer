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
    atomic_mass: number;
    category: ElementCategory;
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
  | 'alkali-metal'
  | 'alkaline-earth'
  | 'transition-metal'
  | 'post-transition'
  | 'metalloid'
  | 'nonmetal'
  | 'halogen'
  | 'noble-gas'
  | 'lanthanide'
  | 'actinide';

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
  selectedCategory?: ElementCategory | null;
  searchTerm?: string;
}

export interface ElementModalProps {
  element: Element | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: ElementCategory | null;
  onCategoryChange: (category: ElementCategory | null) => void;
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
export type OptionalMetadata<T> = Partial<T['metadata']>;
export type CreateElementData = Omit<Element, 'id' | 'created_at' | 'modified_at'>;

// Element position calculation for periodic table layout
export interface ElementPosition {
  period: number;
  group: number;
  element: Element;
}

// Category color mapping
export const CATEGORY_COLORS: Record<ElementCategory, string> = {
  'alkali-metal': '#ff6b6b',
  'alkaline-earth': '#4ecdc4',
  'transition-metal': '#45b7d1',
  'post-transition': '#96ceb4',
  'metalloid': '#feca57',
  'nonmetal': '#ff9ff3',
  'halogen': '#54a0ff',
  'noble-gas': '#5f27cd',
  'lanthanide': '#00d2d3',
  'actinide': '#ff9f43',
};

// Category display names
export const CATEGORY_NAMES: Record<ElementCategory, string> = {
  'alkali-metal': 'Alkali Metals',
  'alkaline-earth': 'Alkaline Earth Metals',
  'transition-metal': 'Transition Metals',
  'post-transition': 'Post-transition Metals',
  'metalloid': 'Metalloids',
  'nonmetal': 'Nonmetals',
  'halogen': 'Halogens',
  'noble-gas': 'Noble Gases',
  'lanthanide': 'Lanthanides',
  'actinide': 'Actinides',
};