import { HttpMethod } from '../../types/home';

export default function HttpMethods() {
  const methods: HttpMethod[] = [
    { method: "GET", description: "Obtener datos", color: "bg-green-500" },
    { method: "POST", description: "Crear nuevos recursos", color: "bg-blue-500" },
    { method: "PUT", description: "Actualizar recursos", color: "bg-yellow-500" },
    { method: "DELETE", description: "Eliminar recursos", color: "bg-red-500" }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        🔍 Métodos HTTP Explicados
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {methods.slice(0, 2).map((method) => (
            <div key={method.method} className="flex items-center gap-3">
              <span className={`${method.color} text-white px-3 py-1 rounded font-bold text-sm`}>
                {method.method}
              </span>
              <span className="text-gray-700 dark:text-gray-300">{method.description}</span>
            </div>
          ))}
        </div>
        
        <div className="space-y-4">
          {methods.slice(2).map((method) => (
            <div key={method.method} className="flex items-center gap-3">
              <span className={`${method.color} text-white px-3 py-1 rounded font-bold text-sm`}>
                {method.method}
              </span>
              <span className="text-gray-700 dark:text-gray-300">{method.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
