import { Todo } from '@/types/jsonplaceholder';

interface TodoCardProps {
  todo: Todo;
  onToggleComplete?: (todo: Todo) => void;
}

export const TodoCard = ({ todo, onToggleComplete }: TodoCardProps) => {
  return (
    <div className={`rounded-lg p-4 border transition-colors ${
      todo.completed 
        ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700' 
        : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
    }`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleComplete?.(todo)}
          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
          }`}
        >
          {todo.completed && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        
        <div className="flex-1">
          <h4 className={`font-medium mb-2 ${
            todo.completed 
              ? 'text-green-800 dark:text-green-200 line-through' 
              : 'text-gray-900 dark:text-white'
          }`}>
            {todo.title}
          </h4>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Usuario ID: {todo.userId}
            </span>
            
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              todo.completed
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              {todo.completed ? 'Completado' : 'Pendiente'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
