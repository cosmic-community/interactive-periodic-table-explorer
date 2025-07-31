import { SearchBarProps } from '@/types'

export default function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Search..." 
}: SearchBarProps) {
  return (
    <div className="relative max-w-sm mx-auto">
      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
        <svg 
          className="h-4 w-4 text-white/60" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-8 pr-8 py-1.5 border border-white/20 rounded bg-white/10 text-white text-sm placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
        placeholder={placeholder}
      />
      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute inset-y-0 right-0 pr-2 flex items-center text-white/60 hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}