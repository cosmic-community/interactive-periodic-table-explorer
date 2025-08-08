import { Element } from '@/types';
import { getCategoryColor } from '@/lib/periodicTableLayout';
import LickabilityBadge from './LickabilityBadge';

interface ElementCardProps {
  element: Element;
  onClick: (element: Element) => void;
  showLickabilityBadge?: boolean;
  gameMode?: 'explore' | 'guess';
  isGuessed?: boolean;
}

export default function ElementCard({ 
  element, 
  onClick, 
  showLickabilityBadge = false,
  gameMode = 'explore',
  isGuessed = false
}: ElementCardProps) {
  const category = typeof element.metadata.category === 'object' 
    ? element.metadata.category.key 
    : element.metadata.category;

  const categoryColorClasses = getCategoryColor(category);

  const lickabilityRating = typeof element.metadata.can_i_lick_it === 'object'
    ? element.metadata.can_i_lick_it?.value || ''
    : element.metadata.can_i_lick_it || '';

  const hasLickabilityData = lickabilityRating && lickabilityRating !== '';

  return (
    <button
      onClick={() => onClick(element)}
      className={`element-card w-full h-full ${categoryColorClasses}
                 rounded-lg flex flex-col items-center justify-center text-white text-shadow
                 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 
                 focus:ring-offset-2 focus:ring-offset-transparent p-1 border-2 relative
                 ${gameMode === 'guess' && !hasLickabilityData ? 'opacity-50 cursor-not-allowed' : ''}
                 ${isGuessed && gameMode === 'guess' ? 'ring-2 ring-yellow-400 ring-opacity-75' : ''}`}
      title={`${element.metadata.element_name} (${element.metadata.symbol}) - Atomic Number: ${element.metadata.atomic_number}${
        gameMode === 'guess' && !hasLickabilityData ? ' - No lickability data' : ''
      }`}
      disabled={gameMode === 'guess' && !hasLickabilityData}
    >
      {/* Guessed indicator */}
      {isGuessed && gameMode === 'guess' && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-black text-xs font-bold">✓</span>
        </div>
      )}

      <div className="w-full h-full flex flex-col items-center justify-center min-h-0">
        {/* Atomic Number */}
        <div className="text-xs opacity-90 leading-none mb-1">
          {element.metadata.atomic_number}
        </div>
        
        {/* Element Symbol */}
        <div className="font-bold text-lg leading-none mb-1 truncate w-full text-center">
          {element.metadata.symbol}
        </div>
        
        {/* Element Name - Truncated for smaller screens */}
        <div className="text-xs opacity-80 leading-tight text-center truncate w-full px-1">
          {element.metadata.element_name}
        </div>

        {/* Lickability Badge (only in explore mode or when explicitly shown) */}
        {showLickabilityBadge && hasLickabilityData && gameMode === 'explore' && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 scale-75">
            <LickabilityBadge rating={lickabilityRating} size="sm" showText={false} />
          </div>
        )}

        {/* Game mode indicator */}
        {gameMode === 'guess' && hasLickabilityData && (
          <div className="absolute top-1 left-1 w-2 h-2 bg-green-400 rounded-full opacity-75"></div>
        )}
      </div>
    </button>
  );
}