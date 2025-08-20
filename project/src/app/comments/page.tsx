'use client';

import { useState, useEffect } from 'react';
import { CommentCard } from '@/components/CommentCard';
import { useComments } from '@/hooks/useJsonPlaceholder';
import { Comment } from '@/types/jsonplaceholder';

export default function CommentsPage() {
  const { comments, loading, error, refetch } = useComments();
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  // Filtrar comentarios basado en los criterios seleccionados
  useEffect(() => {
    let filtered = comments;

    // Filtrar por post específico
    if (selectedPostId) {
      filtered = filtered.filter(comment => comment.postId === selectedPostId);
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(comment =>
        comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredComments(filtered);
  }, [comments, searchTerm, selectedPostId]);

  const getUniquePostIds = () => {
    return Array.from(new Set(comments.map(comment => comment.postId))).sort((a, b) => a - b);
  };

  const getStats = () => {
    const total = comments.length;
    const filtered = filteredComments.length;
    const uniquePosts = getUniquePostIds().length;
    const uniqueEmails = new Set(comments.map(comment => comment.email)).size;

    return { total, filtered, uniquePosts, uniqueEmails };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando comentarios...</p>
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
            Ejercicio: Gestión de Comentarios
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Explora los comentarios de los posts con filtros y búsqueda avanzada.
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
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Comentarios</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filtrados</h3>
            <p className="text-3xl font-bold text-green-600">{stats.filtered}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Posts Únicos</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.uniquePosts}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Emails Únicos</h3>
            <p className="text-3xl font-bold text-orange-600">{stats.uniqueEmails}</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filtros</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Filtro por post */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Post
              </label>
              <select
                value={selectedPostId || ''}
                onChange={(e) => setSelectedPostId(e.target.value ? parseInt(e.target.value) : null)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Todos los posts</option>
                {getUniquePostIds().map(postId => (
                  <option key={postId} value={postId}>
                    Post {postId}
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
                placeholder="Buscar por nombre, email o contenido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Resumen de filtros */}
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Mostrando {filteredComments.length} de {comments.length} comentarios
              {selectedPostId && ` del post ${selectedPostId}`}
              {searchTerm && ` que contengan "${searchTerm}"`}
            </p>
          </div>
        </div>

        {/* Lista de Comentarios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredComments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
            />
          ))}
        </div>

        {/* Mensaje si no hay resultados */}
        {filteredComments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No se encontraron comentarios con los filtros aplicados
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedPostId(null);
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
