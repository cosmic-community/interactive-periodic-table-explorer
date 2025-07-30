import { SearchBarProps } from '@/types'

export default function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  placeholder = 'Search elements...' 
}: SearchBarProps) {
  return (
    <div className="flex justify-center mb-8">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="search-bar"
      />
    </div>
  )
}