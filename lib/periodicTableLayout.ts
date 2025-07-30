import { Element } from '@/types';

// Periodic table layout positions - standard 18-column layout
export const PERIODIC_TABLE_POSITIONS: Record<number, { period: number; group: number }> = {
  // Period 1
  1: { period: 1, group: 1 },   // Hydrogen
  2: { period: 1, group: 18 },  // Helium
  
  // Period 2
  3: { period: 2, group: 1 },   // Lithium
  4: { period: 2, group: 2 },   // Beryllium
  5: { period: 2, group: 13 },  // Boron
  6: { period: 2, group: 14 },  // Carbon
  7: { period: 2, group: 15 },  // Nitrogen
  8: { period: 2, group: 16 },  // Oxygen
  9: { period: 2, group: 17 },  // Fluorine
  10: { period: 2, group: 18 }, // Neon

  // Period 3
  11: { period: 3, group: 1 },  // Sodium
  12: { period: 3, group: 2 },  // Magnesium
  13: { period: 3, group: 13 }, // Aluminum
  14: { period: 3, group: 14 }, // Silicon
  15: { period: 3, group: 15 }, // Phosphorus
  16: { period: 3, group: 16 }, // Sulfur
  17: { period: 3, group: 17 }, // Chlorine
  18: { period: 3, group: 18 }, // Argon

  // Period 4
  19: { period: 4, group: 1 },  // Potassium
  20: { period: 4, group: 2 },  // Calcium
  21: { period: 4, group: 3 },  // Scandium
  22: { period: 4, group: 4 },  // Titanium
  23: { period: 4, group: 5 },  // Vanadium
  24: { period: 4, group: 6 },  // Chromium
  25: { period: 4, group: 7 },  // Manganese
  26: { period: 4, group: 8 },  // Iron
  27: { period: 4, group: 9 },  // Cobalt
  28: { period: 4, group: 10 }, // Nickel
  29: { period: 4, group: 11 }, // Copper
  30: { period: 4, group: 12 }, // Zinc
  31: { period: 4, group: 13 }, // Gallium
  32: { period: 4, group: 14 }, // Germanium
  33: { period: 4, group: 15 }, // Arsenic
  34: { period: 4, group: 16 }, // Selenium
  35: { period: 4, group: 17 }, // Bromine
  36: { period: 4, group: 18 }, // Krypton

  // Period 5
  37: { period: 5, group: 1 },  // Rubidium
  38: { period: 5, group: 2 },  // Strontium
  39: { period: 5, group: 3 },  // Yttrium
  40: { period: 5, group: 4 },  // Zirconium
  41: { period: 5, group: 5 },  // Niobium
  42: { period: 5, group: 6 },  // Molybdenum
  43: { period: 5, group: 7 },  // Technetium
  44: { period: 5, group: 8 },  // Ruthenium
  45: { period: 5, group: 9 },  // Rhodium
  46: { period: 5, group: 10 }, // Palladium
  47: { period: 5, group: 11 }, // Silver
  48: { period: 5, group: 12 }, // Cadmium
  49: { period: 5, group: 13 }, // Indium
  50: { period: 5, group: 14 }, // Tin
  51: { period: 5, group: 15 }, // Antimony
  52: { period: 5, group: 16 }, // Tellurium
  53: { period: 5, group: 17 }, // Iodine
  54: { period: 5, group: 18 }, // Xenon

  // Period 6
  55: { period: 6, group: 1 },  // Cesium
  56: { period: 6, group: 2 },  // Barium
  // Lanthanides (57-71) are placed separately
  72: { period: 6, group: 4 },  // Hafnium
  73: { period: 6, group: 5 },  // Tantalum
  74: { period: 6, group: 6 },  // Tungsten
  75: { period: 6, group: 7 },  // Rhenium
  76: { period: 6, group: 8 },  // Osmium
  77: { period: 6, group: 9 },  // Iridium
  78: { period: 6, group: 10 }, // Platinum
  79: { period: 6, group: 11 }, // Gold
  80: { period: 6, group: 12 }, // Mercury
  81: { period: 6, group: 13 }, // Thallium
  82: { period: 6, group: 14 }, // Lead
  83: { period: 6, group: 15 }, // Bismuth
  84: { period: 6, group: 16 }, // Polonium
  85: { period: 6, group: 17 }, // Astatine
  86: { period: 6, group: 18 }, // Radon

  // Period 7
  87: { period: 7, group: 1 },  // Francium
  88: { period: 7, group: 2 },  // Radium
  // Actinides (89-103) are placed separately
  104: { period: 7, group: 4 }, // Rutherfordium
  105: { period: 7, group: 5 }, // Dubnium
  106: { period: 7, group: 6 }, // Seaborgium
  107: { period: 7, group: 7 }, // Bohrium
  108: { period: 7, group: 8 }, // Hassium
  109: { period: 7, group: 9 }, // Meitnerium
  110: { period: 7, group: 10 }, // Darmstadtium
  111: { period: 7, group: 11 }, // Roentgenium
  112: { period: 7, group: 12 }, // Copernicium
  113: { period: 7, group: 13 }, // Nihonium
  114: { period: 7, group: 14 }, // Flerovium
  115: { period: 7, group: 15 }, // Moscovium
  116: { period: 7, group: 16 }, // Livermorium
  117: { period: 7, group: 17 }, // Tennessine
  118: { period: 7, group: 18 }, // Oganesson
};

// Get element position based on atomic number
export function getElementPosition(atomicNumber: number): { period: number; group: number } | null {
  return PERIODIC_TABLE_POSITIONS[atomicNumber] || null;
}

// Check if element is a lanthanide
export function isLanthanide(atomicNumber: number): boolean {
  return atomicNumber >= 57 && atomicNumber <= 71;
}

// Check if element is an actinide
export function isActinide(atomicNumber: number): boolean {
  return atomicNumber >= 89 && atomicNumber <= 103;
}

// Get lanthanide position in the separate row (0-based index)
export function getLanthanidePosition(atomicNumber: number): number {
  return atomicNumber - 57;
}

// Get actinide position in the separate row (0-based index)
export function getActinidePosition(atomicNumber: number): number {
  return atomicNumber - 89;
}

// Create element layout for rendering
export function createElementLayout(elements: Element[]) {
  const mainTableElements: Array<Element | null> = [];
  const lanthanides: Element[] = [];
  const actinides: Element[] = [];

  // Initialize main table with nulls (7 periods x 18 groups = 126 positions)
  for (let i = 0; i < 126; i++) {
    mainTableElements.push(null);
  }

  elements.forEach(element => {
    const atomicNumber = element.metadata.atomic_number;
    
    if (isLanthanide(atomicNumber)) {
      lanthanides[getLanthanidePosition(atomicNumber)] = element;
    } else if (isActinide(atomicNumber)) {
      actinides[getActinidePosition(atomicNumber)] = element;
    } else {
      const position = getElementPosition(atomicNumber);
      if (position) {
        const index = (position.period - 1) * 18 + (position.group - 1);
        mainTableElements[index] = element;
      }
    }
  });

  return {
    mainTableElements,
    lanthanides,
    actinides
  };
}