import { CategoryFilterProps, CATEGORY_COLORS } from '@/types'

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  // Use the actual category values from the Cosmic data
  const categoryOptions = [
    'Reactive nonmetal',
    'Noble gas',
    'Alkali metal',
    'Alkaline earth metal',
    'Metalloid',
    'Halogen',
    'Post-transition metal',
    'Transition metal',
    'Lanthanide',
    'Actinide',
    'Transition metal (predicted)',
    'Post-transition metal (predicted)',
    'Unknown / Synthetic',
    'Halogen (predicted)',
    'Noble gas (predicted)'
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
      
      {categoryOptions.map((category) => {
        const categoryColor = CATEGORY_COLORS[category];
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
            style={
              selectedCategory === category 
                ? { backgroundColor: categoryColor }
                : {}
            }
          >
            {category}
          </button>
        );
      })}
    </div>
  )
}