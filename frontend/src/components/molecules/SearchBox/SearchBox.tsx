import React, { useState } from 'react'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import { cn } from '@/utils/cn'

export interface SearchBoxProps {
  /**
   * Placeholder del input de búsqueda
   */
  placeholder?: string
  /**
   * Valor inicial de búsqueda
   */
  defaultValue?: string
  /**
   * Función callback cuando se realiza la búsqueda
   */
  onSearch?: (query: string) => void
  /**
   * Estado de carga durante la búsqueda
   */
  loading?: boolean
  /**
   * Tamaño del componente
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Clases CSS adicionales
   */
  className?: string
  /**
   * Mostrar icono de búsqueda
   */
  showIcon?: boolean
}

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = 'Buscar...',
  defaultValue = '',
  onSearch,
  loading = false,
  size = 'md',
  className,
  showIcon = true,
}) => {
  const [query, setQuery] = useState(defaultValue)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(query.trim())
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const searchIcon = showIcon ? (
    <svg 
      className="h-4 w-4" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
      />
    </svg>
  ) : undefined

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn('flex w-full max-w-md gap-2', className)}
    >
      <div className="flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          icon={searchIcon}
          iconPosition="left"
          size={size}
          disabled={loading}
        />
      </div>
      <Button
        type="submit"
        size={size}
        loading={loading}
        disabled={!query.trim() || loading}
      >
        Buscar
      </Button>
    </form>
  )
}

export default SearchBox 