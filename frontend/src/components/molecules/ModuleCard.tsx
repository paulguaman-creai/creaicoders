import type { Module } from '../../types/education';
import { Clock, BookOpen, Tag, Star } from 'lucide-react';

interface ModuleCardProps {
  module: Module;
  onSelect?: (module: Module) => void;
  className?: string;
}

export const ModuleCard = ({ module, onSelect, className = '' }: ModuleCardProps) => {
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800 border-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    advanced: 'bg-red-100 text-red-800 border-red-200',
  };

  const difficultyLabels = {
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
  };

  const handleClick = () => {
    onSelect?.(module);
  };

  return (
    <div
      className={`
        relative bg-white rounded-xl shadow-sm border border-gray-200 
        hover:shadow-lg hover:border-blue-300 transition-all duration-300
        cursor-pointer group overflow-hidden
        ${className}
      `}
      onClick={handleClick}
    >
      {/* Cover Image o Icon */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden">
        {module.coverImageUrl ? (
          <img
            src={module.coverImageUrl}
            alt={module.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-6xl">{module.iconUrl || '📚'}</span>
          </div>
        )}
        
        {/* Badge de dificultad */}
        <div className="absolute top-4 right-4">
          <span
            className={`
              px-3 py-1 rounded-full text-xs font-medium border
              ${difficultyColors[module.difficulty]}
            `}
          >
            {difficultyLabels[module.difficulty]}
          </span>
        </div>

        {/* Número de orden */}
        <div className="absolute top-4 left-4">
          <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-gray-700">{module.order}</span>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        {/* Título y descripción */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {module.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {module.description}
          </p>
        </div>

        {/* Información adicional */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{module.estimatedTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{module.learningObjectives.length} objetivos</span>
          </div>
        </div>

        {/* Tags */}
        {module.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {module.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {module.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{module.tags.length - 3} más</span>
            )}
          </div>
        )}

        {/* Objetivos de aprendizaje */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-1">
            <Star className="w-4 h-4" />
            Aprenderás:
          </h4>
          <ul className="space-y-1">
            {module.learningObjectives.slice(0, 2).map((objective, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="line-clamp-1">{objective}</span>
              </li>
            ))}
            {module.learningObjectives.length > 2 && (
              <li className="text-xs text-gray-400 ml-6">
                +{module.learningObjectives.length - 2} objetivos más
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Call to action en hover */}
      <div className="absolute inset-0 bg-blue-600/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-4xl mb-2">🚀</div>
          <div className="text-lg font-semibold mb-1">¡Empezar ahora!</div>
          <div className="text-sm opacity-90">Aprende {module.title}</div>
        </div>
      </div>
    </div>
  );
}; 