import { ElementCardProps, CATEGORY_COLORS, ElementCategory } from '@/types'

export default function ElementCard({ element, onClick, className = '' }: ElementCardProps) {
  // Handle category being either a string or Cosmic select-dropdown object
  const categoryValue = typeof element.metadata.category === 'string' 
    ? element.metadata.category 
    : element.metadata.category?.value || 'nonmetal'
  
  const categoryColor = CATEGORY_COLORS[categoryValue as ElementCategory] || '#6b7280'
  
  const handleClick = () => {
    onClick?.(element)
  }

  return (
    <div 
      className={`element-card aspect-square p-2 text-center cursor-pointer border-2 rounded-lg transition-all duration-200 hover:scale-105 relative ${className}`}
      style={{
        backgroundColor: `${categoryColor}20`,
        borderColor: `${categoryColor}40`,
      }}
      onClick={handleClick}
    >
      <div className="h-full flex flex-col justify-between">
        {/* Atomic number */}
        <div className="text-xs text-white/80 font-medium">
          {element.metadata.atomic_number}
        </div>
        
        {/* Element symbol */}
        <div 
          className="text-lg md:text-xl lg:text-2xl font-bold text-white text-shadow"
          style={{ color: categoryColor }}
        >
          {element.metadata.symbol}
        </div>
        
        {/* Element name */}
        <div className="text-xs text-white/90 font-medium truncate">
          {element.title}
        </div>
        
        {/* Atomic weight - fixed property name */}
        {element.metadata.atomic_weight && (
          <div className="text-xs text-white/70">
            {parseFloat(element.metadata.atomic_weight).toFixed(2)}
          </div>
        )}
      </div>
      
      {/* Hover overlay */}
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-200 rounded-lg"
        style={{ backgroundColor: categoryColor }}
      />
    </div>
  )
}