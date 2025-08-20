'use client';

import { useState } from 'react';
import { PostCard } from '@/components/PostCard';
import { PostForm } from '@/components/PostForm';
import { usePosts, useCreatePost, useUpdatePost, useDeletePost } from '@/hooks/useJsonPlaceholder';
import { Post } from '@/types/jsonplaceholder';

export default function PostsPage() {
  const { posts, loading, error, refetch } = usePosts();
  const { createPost, loading: creating, success: createSuccess } = useCreatePost();
  const { updatePost, loading: updating, success: updateSuccess } = useUpdatePost();
  const { deletePost, loading: deleting, success: deleteSuccess } = useDeletePost();
  
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const handleCreatePost = async (postData: Omit<Post, 'id'>) => {
    await createPost(postData);
    if (createSuccess) {
      setShowForm(false);
      refetch();
    }
  };

  const handleUpdatePost = async (postData: Omit<Post, 'id'>) => {
    if (editingPost) {
      await updatePost(editingPost.id, postData);
      if (updateSuccess) {
        setEditingPost(null);
        refetch();
      }
    }
  };

  const handleDeletePost = async (postId: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este post?')) {
      await deletePost(postId);
      if (deleteSuccess) {
        refetch();
      }
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando posts...</p>
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
            Ejercicio: Gestión de Posts
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Aprende a consumir APIs REST con operaciones CRUD completas usando JSONPlaceholder.
          </p>
          
          <div className="flex gap-4">
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Crear Nuevo Post
            </button>
            
            <button
              onClick={refetch}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Actualizar Lista
            </button>
          </div>
        </div>

        {/* Formulario */}
        {(showForm || editingPost) && (
          <div className="mb-8">
            <PostForm
              post={editingPost || undefined}
              onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
              onCancel={handleCancel}
              loading={creating || updating}
            />
          </div>
        )}

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Posts</h3>
            <p className="text-3xl font-bold text-blue-600">{posts.length}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Usuarios Únicos</h3>
            <p className="text-3xl font-bold text-green-600">
              {new Set(posts.map(p => p.userId)).size}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Promedio Caracteres</h3>
            <p className="text-3xl font-bold text-purple-600">
              {Math.round(posts.reduce((acc, p) => acc + p.body.length, 0) / posts.length)}
            </p>
          </div>
        </div>

        {/* Lista de Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={handleEdit}
              onDelete={handleDeletePost}
            />
          ))}
        </div>

        {/* Mensajes de éxito */}
        {createSuccess && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            Post creado exitosamente
          </div>
        )}
        
        {updateSuccess && (
          <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg">
            Post actualizado exitosamente
          </div>
        )}
        
        {deleteSuccess && (
          <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
            Post eliminado exitosamente
          </div>
        )}
      </div>
    </div>
  );
}
