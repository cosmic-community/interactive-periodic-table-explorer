import { ElementCardProps, CATEGORY_COLORS } from '@/types'

export default function ElementCard({ element, onClick, className = '' }: ElementCardProps) {
  const categoryColor = CATEGORY_COLORS[element.metadata.category] || '#6b7280'
  
  const handleClick = () => {
    onClick?.(element)
  }

  return (
    <div 
      className={`element-card aspect-square p-2 text-center ${className}`}
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
        
        {/* Atomic mass */}
        <div className="text-xs text-white/70">
          {element.metadata.atomic_mass?.toFixed(2)}
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