import { ElementCardProps, CATEGORY_COLORS, DEFAULT_ELEMENT_COLOR } from '@/types'

export default function ElementCard({ element, onClick, className = '' }: ElementCardProps) {
  // Handle category being either a string or Cosmic select-dropdown object
  const categoryValue = typeof element.metadata.category === 'string' 
    ? element.metadata.category 
    : element.metadata.category?.value || 'Unknown'
  
  const categoryColor = CATEGORY_COLORS[categoryValue] || DEFAULT_ELEMENT_COLOR
  
  const handleClick = () => {
    onClick?.(element)
  }

  return (
    <div 
      className={`element-card aspect-square p-1 md:p-2 text-center cursor-pointer border-2 rounded-lg transition-all duration-200 hover:scale-105 hover:z-10 relative ${className}`}
      style={{
        backgroundColor: `${categoryColor}20`,
        borderColor: `${categoryColor}60`,
      }}
      onClick={handleClick}
    >
      <div className="h-full flex flex-col justify-between text-xs md:text-sm">
        {/* Atomic number */}
        <div className="text-xs text-white/80 font-medium leading-none">
          {element.metadata.atomic_number}
        </div>
        
        {/* Element symbol */}
        <div 
          className="text-lg md:text-xl font-bold text-white flex-1 flex items-center justify-center"
          style={{ color: categoryColor }}
        >
          {element.metadata.symbol}
        </div>
        
        {/* Element name */}
        <div className="text-xs text-white/90 font-medium truncate leading-none">
          {element.title}
        </div>
      </div>
      
      {/* Hover overlay */}
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-200 rounded-lg"
        style={{ backgroundColor: categoryColor }}
      />
    </div>
  )
}