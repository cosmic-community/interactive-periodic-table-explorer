import { PeriodicTableProps, Element, ElementPosition } from '@/types'
import ElementCard from '@/components/ElementCard'

export default function PeriodicTable({ 
  elements, 
  onElementClick, 
  selectedCategory,
  searchTerm 
}: PeriodicTableProps) {
  // Create a map for quick element lookup by position
  const elementsByPosition = new Map<string, Element>()
  elements.forEach(element => {
    const period = element.metadata.period || Math.ceil(element.metadata.atomic_number / 18)
    const group = element.metadata.group || ((element.metadata.atomic_number - 1) % 18) + 1
    elementsByPosition.set(`${period}-${group}`, element)
  })

  // Render main periodic table (periods 1-7, groups 1-18)
  const renderMainTable = (): JSX.Element[] => {
    const cells: JSX.Element[] = []
    
    for (let period = 1; period <= 7; period++) {
      for (let group = 1; group <= 18; group++) {
        const key = `${period}-${group}`
        const element = elementsByPosition.get(key)
        
        if (element) {
          cells.push(
            <div
              key={element.id}
              style={{ 
                gridColumn: group,
                gridRow: period
              }}
            >
              <ElementCard 
                element={element}
                onClick={onElementClick}
              />
            </div>
          )
        } else {
          // Empty cell for proper grid layout
          cells.push(
            <div
              key={`empty-${period}-${group}`}
              style={{ 
                gridColumn: group,
                gridRow: period
              }}
              className="aspect-square"
            />
          )
        }
      }
    }
    
    return cells
  }

  // Render lanthanides and actinides separately
  const renderLanthanideActinide = (): JSX.Element[] => {
    const cells: JSX.Element[] = []
    
    // Lanthanides (atomic numbers 57-71)
    const lanthanides = elements.filter(el => 
      el.metadata.atomic_number >= 57 && el.metadata.atomic_number <= 71
    )
    
    // Actinides (atomic numbers 89-103)
    const actinides = elements.filter(el => 
      el.metadata.atomic_number >= 89 && el.metadata.atomic_number <= 103
    )
    
    // Render lanthanides in first row
    lanthanides.forEach((element, index) => {
      cells.push(
        <div
          key={element.id}
          style={{ 
            gridColumn: index + 1,
            gridRow: 1
          }}
        >
          <ElementCard 
            element={element}
            onClick={onElementClick}
          />
        </div>
      )
    })
    
    // Render actinides in second row
    actinides.forEach((element, index) => {
      cells.push(
        <div
          key={element.id}
          style={{ 
            gridColumn: index + 1,
            gridRow: 2
          }}
        >
          <ElementCard 
            element={element}
            onClick={onElementClick}
          />
        </div>
      )
    })
    
    return cells
  }

  if (elements.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/80 text-lg">
          {searchTerm || selectedCategory 
            ? 'No elements found matching your criteria.' 
            : 'No elements available.'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Main periodic table */}
      <div className="periodic-table-grid">
        {renderMainTable()}
      </div>
      
      {/* Lanthanides and Actinides */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-white/90 text-lg font-semibold mb-2">
            Lanthanides & Actinides
          </h3>
        </div>
        <div className="lanthanide-actinide-grid">
          {renderLanthanideActinide()}
        </div>
      </div>
    </div>
  )
}