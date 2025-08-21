import { PostmanExample } from '../../types/home';

interface PostmanExamplesProps {
  examples: PostmanExample[];
}

export default function PostmanExamples({ examples }: PostmanExamplesProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        📝 Ejemplos para Postman
      </h2>
      
      <div className="space-y-6">
        {examples.map((example, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              {example.description}
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Configuración:</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Método:</span>
                    <span className={`ml-2 px-2 py-1 rounded text-white text-sm font-bold ${
                      example.method === 'POST' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}>
                      {example.method}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">URL:</span>
                    <code className="ml-2 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                      {example.url}
                    </code>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Body (JSON):</h4>
                <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
                  <code>{example.body}</code>
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
