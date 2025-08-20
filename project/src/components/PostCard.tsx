import { Post } from '@/types/jsonplaceholder';

interface PostCardProps {
  post: Post;
  onViewComments?: (postId: number) => void;
  onEdit?: (post: Post) => void;
  onDelete?: (postId: number) => void;
}

export const PostCard = ({ post, onViewComments, onEdit, onDelete }: PostCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
          {post.title}
        </h3>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
          ID: {post.id}
        </span>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {post.body}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Usuario ID: {post.userId}
        </span>
        
        <div className="flex gap-2">
          {onViewComments && (
            <button
              onClick={() => onViewComments(post.id)}
              className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Ver Comentarios
            </button>
          )}
          
          {onEdit && (
            <button
              onClick={() => onEdit(post)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Editar
            </button>
          )}
          
          {onDelete && (
            <button
              onClick={() => onDelete(post.id)}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
