'use client';

import { useState } from 'react';
import { UserCard } from '@/components/UserCard';
import { useUsers } from '@/hooks/useJsonPlaceholder';
import { User } from '@/types/jsonplaceholder';

export default function UsersPage() {
  const { users, loading, error, refetch } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewPosts = (userId: number) => {
    // Navegar a la página de posts del usuario
    window.location.href = `/posts?userId=${userId}`;
  };

  const handleViewTodos = (userId: number) => {
    // Navegar a la página de todos del usuario
    window.location.href = `/todos?userId=${userId}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando usuarios...</p>
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ejercicio: Gestión de Usuarios
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Explora la información de usuarios y sus relaciones con posts y todos.
          </p>
          
          <div className="flex gap-4 mb-6">
            <button
              onClick={refetch}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Actualizar Lista
            </button>
          </div>

          {/* Barra de búsqueda */}
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Buscar usuarios por nombre, username o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Usuarios</h3>
            <p className="text-3xl font-bold text-blue-600">{users.length}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Usuarios Filtrados</h3>
            <p className="text-3xl font-bold text-green-600">{filteredUsers.length}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Dominios Email</h3>
            <p className="text-3xl font-bold text-purple-600">
              {new Set(users.map(u => u.email.split('@')[1])).size}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ciudades Únicas</h3>
            <p className="text-3xl font-bold text-orange-600">
              {new Set(users.map(u => u.address.city)).size}
            </p>
          </div>
        </div>

        {/* Lista de Usuarios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onViewPosts={handleViewPosts}
              onViewTodos={handleViewTodos}
            />
          ))}
        </div>

        {/* Mensaje si no hay resultados */}
        {filteredUsers.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No se encontraron usuarios que coincidan con "{searchTerm}"
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
