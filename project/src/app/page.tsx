import Link from "next/link";

export default function Home() {
  const endpoints = [
    {
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/posts",
      description: "Obtener todos los posts",
      color: "bg-green-500"
    },
    {
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/posts/1",
      description: "Obtener el post con ID 1",
      color: "bg-green-500"
    },
    {
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/posts",
      description: "Crear un nuevo post",
      color: "bg-blue-500"
    },
    {
      method: "PUT",
      url: "https://jsonplaceholder.typicode.com/posts/1",
      description: "Actualizar el post con ID 1",
      color: "bg-yellow-500"
    },
    {
      method: "DELETE",
      url: "https://jsonplaceholder.typicode.com/posts/1",
      description: "Eliminar el post con ID 1",
      color: "bg-red-500"
    }
  ];

  const postmanExamples = [
    {
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/posts",
      body: `{
  "title": "Mi primer post",
  "body": "Este es el contenido de mi post",
  "userId": 1
}`,
      description: "Crear un nuevo post"
    },
    {
      method: "PUT",
      url: "https://jsonplaceholder.typicode.com/posts/1",
      body: `{
  "id": 1,
  "title": "Título actualizado",
  "body": "Contenido actualizado",
  "userId": 1
}`,
      description: "Actualizar un post existente"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🚀 Ejercicio Simple: APIs REST con Postman
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Aprende a probar APIs REST usando Postman con JSONPlaceholder. 
            Este es un ejercicio básico para entender los métodos HTTP.
          </p>
        </div>

        {/* Información de la API */}
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

        {/* Endpoints para probar */}
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

        {/* Ejemplos de Postman */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            📝 Ejemplos para Postman
          </h2>
          
          <div className="space-y-6">
            {postmanExamples.map((example, index) => (
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

        {/* Pasos para usar Postman */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            📋 Pasos para Probar en Postman
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</span>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Descarga Postman</h3>
                <p className="text-gray-600 dark:text-gray-400">Ve a <a href="https://postman.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">postman.com</a> y descarga la aplicación</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Crea una nueva request</h3>
                <p className="text-gray-600 dark:text-gray-400">Haz clic en "New" → "Request"</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</span>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Configura el método y URL</h3>
                <p className="text-gray-600 dark:text-gray-400">Selecciona el método HTTP y escribe la URL del endpoint</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</span>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Para POST/PUT: agrega el body</h3>
                <p className="text-gray-600 dark:text-gray-400">Ve a la pestaña "Body" → "raw" → "JSON" y pega el contenido</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">5</span>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Envía la request</h3>
                <p className="text-gray-600 dark:text-gray-400">Haz clic en "Send" y observa la respuesta</p>
              </div>
            </div>
          </div>
        </div>

        {/* Métodos HTTP explicados */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            🔍 Métodos HTTP Explicados
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-green-500 text-white px-3 py-1 rounded font-bold text-sm">GET</span>
                <span className="text-gray-700 dark:text-gray-300">Obtener datos</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-blue-500 text-white px-3 py-1 rounded font-bold text-sm">POST</span>
                <span className="text-gray-700 dark:text-gray-300">Crear nuevos recursos</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-yellow-500 text-white px-3 py-1 rounded font-bold text-sm">PUT</span>
                <span className="text-gray-700 dark:text-gray-300">Actualizar recursos</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-red-500 text-white px-3 py-1 rounded font-bold text-sm">DELETE</span>
                <span className="text-gray-700 dark:text-gray-300">Eliminar recursos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
          <p>
            <a 
              href="https://jsonplaceholder.typicode.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Ver documentación completa de JSONPlaceholder →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
