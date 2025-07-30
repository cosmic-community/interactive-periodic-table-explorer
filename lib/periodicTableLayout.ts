import { Element } from '@/types'

// Category color mapping with translucent Tailwind classes
const categoryColorMap: Record<string, string> = {
  // Metals
  'alkali_metal': 'bg-red-500/30 border-red-400/40 hover:bg-red-500/40',
  'alkaline_earth_metal': 'bg-orange-500/30 border-orange-400/40 hover:bg-orange-500/40',
  'transition_metal': 'bg-blue-500/30 border-blue-400/40 hover:bg-blue-500/40',
  'transition_metal_predicted': 'bg-blue-400/30 border-blue-300/40 hover:bg-blue-400/40',
  'post_transition_metal': 'bg-indigo-500/30 border-indigo-400/40 hover:bg-indigo-500/40',
  'post_transition_metal_predicted': 'bg-indigo-400/30 border-indigo-300/40 hover:bg-indigo-400/40',
  'lanthanide': 'bg-purple-500/30 border-purple-400/40 hover:bg-purple-500/40',
  'actinide': 'bg-pink-500/30 border-pink-400/40 hover:bg-pink-500/40',
  
  // Non-metals
  'reactive_nonmetal': 'bg-green-500/30 border-green-400/40 hover:bg-green-500/40',
  'noble_gas': 'bg-cyan-500/30 border-cyan-400/40 hover:bg-cyan-500/40',
  'noble_gas_predicted': 'bg-cyan-400/30 border-cyan-300/40 hover:bg-cyan-400/40',
  'halogen': 'bg-yellow-500/30 border-yellow-400/40 hover:bg-yellow-500/40',
  'halogen_predicted': 'bg-yellow-400/30 border-yellow-300/40 hover:bg-yellow-400/40',
  
  // Metalloids and others
  'metalloid': 'bg-teal-500/30 border-teal-400/40 hover:bg-teal-500/40',
  'unknown_synthetic': 'bg-gray-500/30 border-gray-400/40 hover:bg-gray-500/40',
}

// Default color for unknown categories
const defaultColor = 'bg-slate-500/30 border-slate-400/40 hover:bg-slate-500/40'

export function getCategoryColor(category: string): string {
  // Handle category object format
  const categoryKey = typeof category === 'object' && category !== null && 'key' in category 
    ? (category as { key: string }).key 
    : category
  
  return categoryColorMap[categoryKey] || defaultColor
}

// Existing layout functions remain unchanged
export function createElementLayout(elements: Element[]) {
  // Create arrays to hold elements in their proper positions
  const mainTableElements: (Element | null)[] = new Array(126).fill(null) // 7 periods × 18 groups
  const lanthanides: (Element | null)[] = new Array(15).fill(null)
  const actinides: (Element | null)[] = new Array(15).fill(null)

  elements.forEach(element => {
    const atomicNumber = element.metadata.atomic_number
    
    // Lanthanides (57-71)
    if (atomicNumber >= 57 && atomicNumber <= 71) {
      lanthanides[atomicNumber - 57] = element
      return
    }
    
    // Actinides (89-103)
    if (atomicNumber >= 89 && atomicNumber <= 103) {
      actinides[atomicNumber - 89] = element
      return
    }
    
    // Get position for main table elements
    const position = getElementPosition(atomicNumber)
    if (position) {
      const index = (position.period - 1) * 18 + (position.group - 1)
      mainTableElements[index] = element
    }
  })

  return {
    mainTableElements,
    lanthanides,
    actinides
  }
}

interface ElementPosition {
  period: number
  group: number
}

function getElementPosition(atomicNumber: number): ElementPosition | null {
  // Mapping atomic numbers to their grid positions
  const positions: Record<number, ElementPosition> = {
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
    // 57-71 are lanthanides (handled separately)
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
    // 89-103 are actinides (handled separately)
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
  
  return positions[atomicNumber] || null
}