import { CategoryFilterProps } from '@/types'

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  const categoryOptions = [
    'Alkali Metal',
    'Alkaline Earth Metal', 
    'Transition Metal',
    'Post-Transition Metal',
    'Metalloid',
    'Nonmetal',
    'Halogen',
    'Noble Gas',
    'Lanthanide',
    'Actinide'
  ]

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          !selectedCategory
            ? 'bg-blue-600 text-white'
            : 'bg-white/10 text-white/80 hover:bg-white/20'
        }`}
      >
        All Categories
      </button>
      
      {categoryOptions.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-white/10 text-white/80 hover:bg-white/20'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}