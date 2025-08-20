import { Comment } from '@/types/jsonplaceholder';

interface CommentCardProps {
  comment: Comment;
}

export const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-medium text-gray-900 dark:text-white">
          {comment.name}
        </h4>
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
          ID: {comment.id}
        </span>
      </div>
      
      <div className="mb-3">
        <span className="text-sm text-gray-500 dark:text-gray-400">Email:</span>
        <span className="text-sm text-gray-700 dark:text-gray-300 ml-2">{comment.email}</span>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        {comment.body}
      </p>
      
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Post ID: {comment.postId}
        </span>
      </div>
    </div>
  );
};
