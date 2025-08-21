export default function ApiInfo() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        📡 ¿Qué es JSONPlaceholder?
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Es una API REST gratuita que proporciona datos de prueba. No requiere autenticación 
        y puedes probarla directamente desde Postman.
      </p>
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
        <p className="text-blue-800 dark:text-blue-200 font-medium">
          🌐 URL Base: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">https://jsonplaceholder.typicode.com</code>
        </p>
      </div>
    </div>
  );
}
