'use client'

import { useState } from 'react'
import { Element, Category } from '@/types'
import PeriodicTable from '@/components/PeriodicTable'
import SearchBar from '@/components/SearchBar'
import CategoryFilter from '@/components/CategoryFilter'
import ElementModal from '@/components/ElementModal'

interface PeriodicTableContainerProps {
  elements: Element[]
  categories: Category[]
}

export default function PeriodicTableContainer({ 
  elements, 
  categories 
}: PeriodicTableContainerProps) {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Filter elements based on search and category
  const filteredElements = elements.filter(element => {
    const matchesSearch = !searchTerm || 
      element.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.metadata.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.metadata.atomic_number.toString().includes(searchTerm)

    const matchesCategory = !selectedCategory || 
      (typeof element.metadata.category === 'object' 
        ? element.metadata.category.value === selectedCategory
        : element.metadata.category === selectedCategory)

    return matchesSearch && matchesCategory
  })

  const handleElementClick = (element: Element) => {
    setSelectedElement(element)
  }

  const handleCloseModal = () => {
    setSelectedElement(null)
  }

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
  }

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
  }

  return (
    <>
      <div className="space-y-8">
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          placeholder="Search elements by name, symbol, or atomic number..."
        />

        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <PeriodicTable 
          elements={filteredElements}
          onElementClick={handleElementClick}
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
        />
      </div>

      <ElementModal 
        element={selectedElement}
        isOpen={!!selectedElement}
        onClose={handleCloseModal}
      />
    </>
  )
}