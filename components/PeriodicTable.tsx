import { PeriodicTableProps, Element } from '@/types';
import { createElementLayout } from '@/lib/periodicTableLayout';
import ElementCard from '@/components/ElementCard';

export default function PeriodicTable({ 
  elements, 
  onElementClick, 
  selectedCategory,
  searchTerm,
  gameMode = 'explore',
  guessedElements = new Set()
}: PeriodicTableProps & { guessedElements?: Set<string> }) {
  const { mainTableElements, lanthanides, actinides } = createElementLayout(elements);

  // Safe handler that checks if onElementClick is defined
  const handleElementClick = (element: Element) => {
    if (onElementClick) {
      onElementClick(element);
    }
  };

  // Render main periodic table (7 periods x 18 groups)
  const renderMainTable = (): JSX.Element[] => {
    const cells: JSX.Element[] = [];
    
    for (let period = 1; period <= 7; period++) {
      for (let group = 1; group <= 18; group++) {
        const index = (period - 1) * 18 + (group - 1);
        const element = mainTableElements[index];
        
        const key = `${period}-${group}`;
        
        if (element) {
          cells.push(
            <div
              key={element.id}
              style={{ 
                gridColumn: group,
                gridRow: period
              }}
              className="w-full h-full"
            >
              <ElementCard 
                element={element}
                onClick={handleElementClick}
                gameMode={gameMode}
                isGuessed={guessedElements.has(element.id)}
                showLickabilityBadge={gameMode === 'explore'}
              />
            </div>
          );
        } else {
          // Empty cell for proper grid layout
          // Special placeholders for lanthanides and actinides
          let placeholder = null;
          if (period === 6 && group === 3) {
            placeholder = (
              <div className="w-full aspect-square border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center text-white/50 text-xs text-center p-1">
                <span className="leading-tight">57-71</span>
              </div>
            );
          } else if (period === 7 && group === 3) {
            placeholder = (
              <div className="w-full aspect-square border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center text-white/50 text-xs text-center p-1">
                <span className="leading-tight">89-103</span>
              </div>
            );
          }
          
          cells.push(
            <div
              key={key}
              style={{ 
                gridColumn: group,
                gridRow: period
              }}
              className="w-full aspect-square"
            >
              {placeholder}
            </div>
          );
        }
      }
    }
    
    return cells;
  };

  // Render lanthanides and actinides separately
  const renderLanthanideActinide = (): JSX.Element[] => {
    const cells: JSX.Element[] = [];
    
    // Render lanthanides in first row
    lanthanides.forEach((element, index) => {
      if (element) {
        cells.push(
          <div
            key={element.id}
            style={{ 
              gridColumn: index + 1,
              gridRow: 1
            }}
            className="w-full h-full"
          >
            <ElementCard 
              element={element}
              onClick={handleElementClick}
              gameMode={gameMode}
              isGuessed={guessedElements.has(element.id)}
              showLickabilityBadge={gameMode === 'explore'}
            />
          </div>
        );
      }
    });
    
    // Render actinides in second row
    actinides.forEach((element, index) => {
      if (element) {
        cells.push(
          <div
            key={element.id}
            style={{ 
              gridColumn: index + 1,
              gridRow: 2
            }}
            className="w-full h-full"
          >
            <ElementCard 
              element={element}
              onClick={handleElementClick}
              gameMode={gameMode}
              isGuessed={guessedElements.has(element.id)}
              showLickabilityBadge={gameMode === 'explore'}
            />
          </div>
        );
      }
    });
    
    return cells;
  };

  if (elements.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/80 text-lg">
          {searchTerm || selectedCategory 
            ? 'No elements found matching your criteria.' 
            : 'No elements available.'}
        </p>
      </div>
    );
  }

  const elementsWithLickabilityData = elements.filter(element => {
    const lickabilityRating = typeof element.metadata.can_i_lick_it === 'object'
      ? element.metadata.can_i_lick_it?.value || ''
      : element.metadata.can_i_lick_it || '';
    return lickabilityRating && lickabilityRating !== '';
  });

  return (
    <div className="w-full space-y-8 no-scroll">
      {/* Game mode info */}
      {gameMode === 'guess' && (
        <div className="text-center text-white/90 bg-white/10 rounded-lg p-4">
          <p className="text-lg font-semibold mb-2">
            🎯 Game Mode Active!
          </p>
          <p className="text-sm">
            Elements with a green dot have lickability data - click them to make your guess!<br/>
            <span className="text-yellow-400">✓</span> = Already guessed | 
            Available: {elementsWithLickabilityData.length} elements
          </p>
        </div>
      )}

      {/* Main periodic table */}
      <div className="periodic-table-container">
        <div className="periodic-table-grid">
          {renderMainTable()}
        </div>
      </div>
      
      {/* Lanthanides and Actinides */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-white/90 text-lg font-semibold mb-2">
            Lanthanides & Actinides
          </h3>
        </div>
        <div className="periodic-table-container">
          <div className="lanthanide-actinide-grid">
            {renderLanthanideActinide()}
          </div>
        </div>
      </div>
    </div>
  );
}