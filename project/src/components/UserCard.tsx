import { User } from '@/types/jsonplaceholder';

interface UserCardProps {
  user: User;
  onViewPosts?: (userId: number) => void;
  onViewTodos?: (userId: number) => void;
}

export const UserCard = ({ user, onViewPosts, onViewTodos }: UserCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {user.name}
        </h3>
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
          ID: {user.id}
        </span>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Usuario:</span>
          <span className="text-sm text-gray-700 dark:text-gray-300">@{user.username}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Email:</span>
          <span className="text-sm text-gray-700 dark:text-gray-300">{user.email}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Teléfono:</span>
          <span className="text-sm text-gray-700 dark:text-gray-300">{user.phone}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Sitio web:</span>
          <a 
            href={`https://${user.website}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            {user.website}
          </a>
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dirección:</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {user.address.street}, {user.address.suite}<br />
            {user.address.city}, {user.address.zipcode}
          </p>
        </div>
        
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Empresa:</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {user.company.name}<br />
            <span className="italic">{user.company.catchPhrase}</span>
          </p>
        </div>
        
        <div className="flex gap-2">
          {onViewPosts && (
            <button
              onClick={() => onViewPosts(user.id)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Ver Posts
            </button>
          )}
          
          {onViewTodos && (
            <button
              onClick={() => onViewTodos(user.id)}
              className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              Ver Todos
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
