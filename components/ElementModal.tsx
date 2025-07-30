'use client'

import { ElementModalProps } from '@/types'
import { useEffect } from 'react'

export default function ElementModal({ element, isOpen, onClose }: ElementModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !element) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl font-bold"
                style={{ backgroundColor: element.metadata.color_code || '#667eea' }}
              >
                {element.metadata.symbol}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{element.title}</h2>
                <p className="text-gray-600">Atomic Number: {element.metadata.atomic_number}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Basic Properties</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Symbol:</span>
                    <span className="font-medium">{element.metadata.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Atomic Number:</span>
                    <span className="font-medium">{element.metadata.atomic_number}</span>
                  </div>
                  {element.metadata.atomic_weight && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Atomic Weight:</span>
                      <span className="font-medium">{element.metadata.atomic_weight}</span>
                    </div>
                  )}
                  {element.metadata.period && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Period:</span>
                      <span className="font-medium">{element.metadata.period}</span>
                    </div>
                  )}
                  {element.metadata.group && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Group:</span>
                      <span className="font-medium">{element.metadata.group}</span>
                    </div>
                  )}
                </div>
              </div>

              {element.metadata.category && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Category</h3>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {typeof element.metadata.category === 'object' 
                      ? element.metadata.category.value 
                      : element.metadata.category}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {element.metadata.electron_configuration && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Electron Configuration</h3>
                  <p className="text-sm text-gray-700 font-mono bg-gray-100 p-2 rounded">
                    {element.metadata.electron_configuration}
                  </p>
                </div>
              )}

              {element.metadata.state && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">State at Room Temperature</h3>
                  <p className="text-sm text-gray-700">
                    {typeof element.metadata.state === 'object' 
                      ? element.metadata.state.value 
                      : element.metadata.state}
                  </p>
                </div>
              )}

              {element.metadata.discovery_year && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Discovery Year</h3>
                  <p className="text-sm text-gray-700">
                    {element.metadata.discovery_year > 0 
                      ? element.metadata.discovery_year 
                      : `${Math.abs(element.metadata.discovery_year)} BCE`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {element.metadata.description && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{element.metadata.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}