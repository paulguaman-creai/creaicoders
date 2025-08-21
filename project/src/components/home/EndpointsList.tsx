import { Endpoint } from '../../types/home';

interface EndpointsListProps {
  endpoints: Endpoint[];
}

export default function EndpointsList({ endpoints }: EndpointsListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        🔗 Endpoints para Probar en Postman
      </h2>
      
      <div className="space-y-4">
        {endpoints.map((endpoint, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <span className={`${endpoint.color} text-white px-3 py-1 rounded font-mono text-sm font-bold`}>
                {endpoint.method}
              </span>
              <code className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded font-mono text-sm flex-1">
                {endpoint.url}
              </code>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-2 ml-20">
              {endpoint.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
