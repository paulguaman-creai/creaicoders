'use client';

import { useState, useEffect } from 'react';
import { TodoCard } from '@/components/TodoCard';
import { useTodos } from '@/hooks/useJsonPlaceholder';
import { Todo } from '@/types/jsonplaceholder';

export default function TodosPage() {
  const { todos, loading, error, refetch } = useTodos();
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // Filtrar todos basado en los criterios seleccionados
  useEffect(() => {
    let filtered = todos;

    // Filtrar por estado
    if (filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    } else if (filter === 'pending') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    // Filtrar por usuario
    if (selectedUserId) {
      filtered = filtered.filter(todo => todo.userId === selectedUserId);
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTodos(filtered);
  }, [todos, filter, searchTerm, selectedUserId]);

  const handleToggleComplete = (todo: Todo) => {
    // En una aplicación real, aquí se haría la llamada a la API para actualizar
    console.log('Toggle todo:', todo);
  };

  const getUniqueUserIds = () => {
    return Array.from(new Set(todos.map(todo => todo.userId))).sort((a, b) => a - b);
  };

  const getStats = () => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, completionRate };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando todos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>Error: {error}</p>
              <button
                onClick={refetch}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ejercicio: Gestión de Todos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Explora y gestiona la lista de tareas con filtros avanzados y estadísticas.
          </p>
          
          <div className="flex gap-4 mb-6">
            <button
              onClick={refetch}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Actualizar Lista
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Todos</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Completados</h3>
            <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pendientes</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tasa de Completado</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.completionRate}%</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filtros</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Filtro por estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Estado
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'completed' | 'pending')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Todos</option>
                <option value="completed">Completados</option>
                <option value="pending">Pendientes</option>
              </select>
            </div>

            {/* Filtro por usuario */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Usuario
              </label>
              <select
                value={selectedUserId || ''}
                onChange={(e) => setSelectedUserId(e.target.value ? parseInt(e.target.value) : null)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Todos los usuarios</option>
                {getUniqueUserIds().map(userId => (
                  <option key={userId} value={userId}>
                    Usuario {userId}
                  </option>
                ))}
              </select>
            </div>

            {/* Búsqueda por texto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Buscar
              </label>
              <input
                type="text"
                placeholder="Buscar por título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Resumen de filtros */}
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Mostrando {filteredTodos.length} de {todos.length} todos
              {filter !== 'all' && ` (${filter === 'completed' ? 'completados' : 'pendientes'})`}
              {selectedUserId && ` del usuario ${selectedUserId}`}
              {searchTerm && ` que contengan "${searchTerm}"`}
            </p>
          </div>
        </div>

        {/* Lista de Todos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTodos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>

        {/* Mensaje si no hay resultados */}
        {filteredTodos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No se encontraron todos con los filtros aplicados
            </p>
            <button
              onClick={() => {
                setFilter('all');
                setSearchTerm('');
                setSelectedUserId(null);
              }}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
