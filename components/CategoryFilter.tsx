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
    <div className="flex flex-wrap gap-1 justify-center">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
          !selectedCategory
            ? 'bg-blue-600 text-white'
            : 'bg-white/10 text-white/80 hover:bg-white/20'
        }`}
      >
        All
      </button>
      
      {categoryOptions.map((category) => {
        const categoryColor = CATEGORY_COLORS[category];
        // Shortened labels for compact display
        const shortLabel = category
          .replace('Transition metal (predicted)', 'Trans. (pred.)')
          .replace('Post-transition metal (predicted)', 'Post-trans. (pred.)')
          .replace('Noble gas (predicted)', 'Noble (pred.)')
          .replace('Halogen (predicted)', 'Halogen (pred.)')
          .replace('Alkaline earth metal', 'Alkaline earth')
          .replace('Post-transition metal', 'Post-transition')
          .replace('Transition metal', 'Transition')
          .replace('Unknown / Synthetic', 'Unknown/Synth.')
          .replace('Reactive nonmetal', 'Reactive nonmet.');
          
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              selectedCategory === category
                ? 'text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
            style={
              selectedCategory === category 
                ? { backgroundColor: categoryColor }
                : {}
            }
            title={category} // Full category name on hover
          >
            {shortLabel}
          </button>
        );
      })}
    </div>
  )
}