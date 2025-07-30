import { Element } from '@/types'
import { getCategoryColor } from '@/lib/periodicTableLayout'

interface ElementCardProps {
  element: Element
  onClick: (element: Element) => void
}

export default function ElementCard({ element, onClick }: ElementCardProps) {
  const category = typeof element.metadata.category === 'object' 
    ? element.metadata.category.key 
    : element.metadata.category

  const categoryColorClasses = getCategoryColor(category)

  return (
    <button
      onClick={() => onClick(element)}
      className={`element-card w-full h-full ${categoryColorClasses}
                 rounded-lg flex flex-col items-center justify-center text-white text-shadow
                 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 
                 focus:ring-offset-2 focus:ring-offset-transparent p-1`}
      title={`${element.metadata.element_name} (${element.metadata.symbol}) - Atomic Number: ${element.metadata.atomic_number}`}
    >
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
      </div>
    </button>
  )
}