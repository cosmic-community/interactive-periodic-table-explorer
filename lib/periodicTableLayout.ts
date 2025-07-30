import { Element } from '@/types'

// Element position definitions for the standard periodic table layout
export const ELEMENT_POSITIONS: Record<number, { period: number; group: number }> = {
  // Period 1
  1: { period: 1, group: 1 },   // H
  2: { period: 1, group: 18 },  // He
  
  // Period 2
  3: { period: 2, group: 1 },   // Li
  4: { period: 2, group: 2 },   // Be
  5: { period: 2, group: 13 },  // B
  6: { period: 2, group: 14 },  // C
  7: { period: 2, group: 15 },  // N
  8: { period: 2, group: 16 },  // O
  9: { period: 2, group: 17 },  // F
  10: { period: 2, group: 18 }, // Ne

  // Period 3
  11: { period: 3, group: 1 },  // Na
  12: { period: 3, group: 2 },  // Mg
  13: { period: 3, group: 13 }, // Al
  14: { period: 3, group: 14 }, // Si
  15: { period: 3, group: 15 }, // P
  16: { period: 3, group: 16 }, // S
  17: { period: 3, group: 17 }, // Cl
  18: { period: 3, group: 18 }, // Ar

  // Period 4
  19: { period: 4, group: 1 },  // K
  20: { period: 4, group: 2 },  // Ca
  21: { period: 4, group: 3 },  // Sc
  22: { period: 4, group: 4 },  // Ti
  23: { period: 4, group: 5 },  // V
  24: { period: 4, group: 6 },  // Cr
  25: { period: 4, group: 7 },  // Mn
  26: { period: 4, group: 8 },  // Fe
  27: { period: 4, group: 9 },  // Co
  28: { period: 4, group: 10 }, // Ni
  29: { period: 4, group: 11 }, // Cu
  30: { period: 4, group: 12 }, // Zn
  31: { period: 4, group: 13 }, // Ga
  32: { period: 4, group: 14 }, // Ge
  33: { period: 4, group: 15 }, // As
  34: { period: 4, group: 16 }, // Se
  35: { period: 4, group: 17 }, // Br
  36: { period: 4, group: 18 }, // Kr

  // Period 5
  37: { period: 5, group: 1 },  // Rb
  38: { period: 5, group: 2 },  // Sr
  39: { period: 5, group: 3 },  // Y
  40: { period: 5, group: 4 },  // Zr
  41: { period: 5, group: 5 },  // Nb
  42: { period: 5, group: 6 },  // Mo
  43: { period: 5, group: 7 },  // Tc
  44: { period: 5, group: 8 },  // Ru
  45: { period: 5, group: 9 },  // Rh
  46: { period: 5, group: 10 }, // Pd
  47: { period: 5, group: 11 }, // Ag
  48: { period: 5, group: 12 }, // Cd
  49: { period: 5, group: 13 }, // In
  50: { period: 5, group: 14 }, // Sn
  51: { period: 5, group: 15 }, // Sb
  52: { period: 5, group: 16 }, // Te
  53: { period: 5, group: 17 }, // I
  54: { period: 5, group: 18 }, // Xe

  // Period 6
  55: { period: 6, group: 1 },  // Cs
  56: { period: 6, group: 2 },  // Ba
  // 57-71 are lanthanides (placed in separate section)
  72: { period: 6, group: 4 },  // Hf
  73: { period: 6, group: 5 },  // Ta
  74: { period: 6, group: 6 },  // W
  75: { period: 6, group: 7 },  // Re
  76: { period: 6, group: 8 },  // Os
  77: { period: 6, group: 9 },  // Ir
  78: { period: 6, group: 10 }, // Pt
  79: { period: 6, group: 11 }, // Au
  80: { period: 6, group: 12 }, // Hg
  81: { period: 6, group: 13 }, // Tl
  82: { period: 6, group: 14 }, // Pb
  83: { period: 6, group: 15 }, // Bi
  84: { period: 6, group: 16 }, // Po
  85: { period: 6, group: 17 }, // At
  86: { period: 6, group: 18 }, // Rn

  // Period 7
  87: { period: 7, group: 1 },  // Fr
  88: { period: 7, group: 2 },  // Ra
  // 89-103 are actinides (placed in separate section)
  104: { period: 7, group: 4 }, // Rf
  105: { period: 7, group: 5 }, // Db
  106: { period: 7, group: 6 }, // Sg
  107: { period: 7, group: 7 }, // Bh
  108: { period: 7, group: 8 }, // Hs
  109: { period: 7, group: 9 }, // Mt
  110: { period: 7, group: 10 }, // Ds
  111: { period: 7, group: 11 }, // Rg
  112: { period: 7, group: 12 }, // Cn
  113: { period: 7, group: 13 }, // Nh
  114: { period: 7, group: 14 }, // Fl
  115: { period: 7, group: 15 }, // Mc
  116: { period: 7, group: 16 }, // Lv
  117: { period: 7, group: 17 }, // Ts
  118: { period: 7, group: 18 }, // Og
}

// Lanthanides (atomic numbers 57-71)
export const LANTHANIDES = [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71]

// Actinides (atomic numbers 89-103)  
export const ACTINIDES = [89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103]

// Color mapping for element categories with transparent backgrounds
export const CATEGORY_COLORS: Record<string, string> = {
  'reactive_nonmetal': 'bg-red-500/30',           // Light red
  'noble_gas': 'bg-purple-500/30',                // Light purple
  'alkali_metal': 'bg-pink-500/30',               // Light pink
  'alkaline_earth_metal': 'bg-teal-500/30',       // Light teal
  'metalloid': 'bg-yellow-500/30',                // Light yellow
  'halogen': 'bg-blue-500/30',                    // Light blue
  'post_transition_metal': 'bg-green-500/30',     // Light green
  'transition_metal': 'bg-cyan-500/30',           // Light cyan
  'lanthanide': 'bg-emerald-500/30',              // Light emerald
  'actinide': 'bg-orange-500/30',                 // Light orange
  'transition_metal_predicted': 'bg-sky-500/30',  // Light sky blue
  'post_transition_metal_predicted': 'bg-violet-500/30', // Light violet
  'unknown_synthetic': 'bg-indigo-500/30',        // Light indigo
  'halogen_predicted': 'bg-blue-600/30',          // Darker light blue
  'noble_gas_predicted': 'bg-purple-600/30',      // Darker light purple
}

// Default color for unknown categories
export const DEFAULT_ELEMENT_COLOR = 'bg-gray-500/30'

// Get category color based on element category
export function getCategoryColor(category: string | { key: string; value: string }): string {
  let categoryKey: string
  
  if (typeof category === 'object' && category !== null) {
    categoryKey = category.key
  } else {
    categoryKey = category || ''
  }
  
  return CATEGORY_COLORS[categoryKey] || DEFAULT_ELEMENT_COLOR
}

// Create the element layout for the periodic table
export function createElementLayout(elements: Element[]) {
  // Initialize arrays for different sections
  const mainTableElements: (Element | null)[] = new Array(126).fill(null) // 7 periods × 18 groups
  const lanthanides: (Element | null)[] = new Array(15).fill(null)
  const actinides: (Element | null)[] = new Array(15).fill(null)

  // Place elements in their correct positions
  elements.forEach((element) => {
    const atomicNumber = element.metadata.atomic_number
    
    if (LANTHANIDES.includes(atomicNumber)) {
      // Place in lanthanides section (57-71 maps to indices 0-14)
      const index = atomicNumber - 57
      lanthanides[index] = element
    } else if (ACTINIDES.includes(atomicNumber)) {
      // Place in actinides section (89-103 maps to indices 0-14)
      const index = atomicNumber - 89
      actinides[index] = element
    } else {
      // Place in main table
      const position = ELEMENT_POSITIONS[atomicNumber]
      if (position) {
        const index = (position.period - 1) * 18 + (position.group - 1)
        mainTableElements[index] = element
      }
    }
  })

  return {
    mainTableElements,
    lanthanides,
    actinides
  }
}

// Get element by atomic number
export function getElementByAtomicNumber(elements: Element[], atomicNumber: number): Element | undefined {
  return elements.find(element => element.metadata.atomic_number === atomicNumber)
}

// Get elements by category
export function getElementsByCategory(elements: Element[], category: string): Element[] {
  return elements.filter(element => {
    const elementCategory = typeof element.metadata.category === 'object' 
      ? element.metadata.category.key 
      : element.metadata.category
    return elementCategory === category
  })
}

// Get all unique categories from elements
export function getUniqueCategories(elements: Element[]): string[] {
  const categories = elements.map(element => {
    return typeof element.metadata.category === 'object'
      ? element.metadata.category.value
      : element.metadata.category
  })
  
  return [...new Set(categories)].sort()
}

// Search elements by name, symbol, or atomic number
export function searchElements(elements: Element[], searchTerm: string): Element[] {
  if (!searchTerm.trim()) return elements
  
  const term = searchTerm.toLowerCase().trim()
  
  return elements.filter(element => {
    const name = element.metadata.element_name?.toLowerCase() || ''
    const symbol = element.metadata.symbol?.toLowerCase() || ''
    const atomicNumber = element.metadata.atomic_number?.toString() || ''
    
    return name.includes(term) || 
           symbol.includes(term) || 
           atomicNumber.includes(term)
  })
}

// Filter elements by category and search term
export function filterElements(
  elements: Element[], 
  selectedCategory: string | null, 
  searchTerm: string
): Element[] {
  let filtered = elements
  
  // Filter by category if selected
  if (selectedCategory) {
    filtered = filtered.filter(element => {
      const elementCategory = typeof element.metadata.category === 'object'
        ? element.metadata.category.value
        : element.metadata.category
      return elementCategory === selectedCategory
    })
  }
  
  // Filter by search term
  if (searchTerm.trim()) {
    filtered = searchElements(filtered, searchTerm)
  }
  
  return filtered
}

// Sort elements by atomic number
export function sortElementsByAtomicNumber(elements: Element[]): Element[] {
  return [...elements].sort((a, b) => a.metadata.atomic_number - b.metadata.atomic_number)
}

// Get element statistics
export function getElementStatistics(elements: Element[]) {
  const totalElements = elements.length
  const categories = getUniqueCategories(elements)
  const categoryCount = categories.length
  
  const categoryDistribution = categories.map(category => ({
    category,
    count: getElementsByCategory(elements, category).length
  }))
  
  return {
    totalElements,
    categoryCount,
    categories,
    categoryDistribution
  }
}