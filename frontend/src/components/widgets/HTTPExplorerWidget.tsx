import React, { useState } from 'react';
import { RealTimeExerciseWidget } from '../RealTimeExerciseWidget';

interface HTTPResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body?: string;
}

export const HTTPExplorerWidget: React.FC = () => {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  const [response, setResponse] = useState<HTTPResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const response = await fetch(url, { method });
      const headers: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });

      let body;
      try {
        body = await response.json();
        body = JSON.stringify(body, null, 2);
      } catch {
        body = await response.text();
      }

      setResponse({
        status: response.status,
        statusText: response.statusText,
        headers,
        body
      });
    } catch (err) {
      setError('Hubo un error al hacer la petición. Verifica la URL e intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600';
    if (status >= 300 && status < 400) return 'text-blue-600';
    if (status >= 400 && status < 500) return 'text-yellow-600';
    return 'text-red-600';
  };

  const content = (
    <div className="space-y-6">
      <div className="flex gap-4">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as 'GET' | 'POST' | 'PUT' | 'DELETE')}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
        
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Ingresa una URL"
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        
        <button
          onClick={handleRequest}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {response && (
        <div className="space-y-4">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Respuesta del Servidor</h3>
            
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Estado: </span>
                <span className={getStatusColor(response.status)}>
                  {response.status} {response.statusText}
                </span>
              </p>
              
              <div>
                <p className="font-semibold mb-2">Encabezados:</p>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                  {Object.entries(response.headers)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join('\n')}
                </pre>
              </div>
              
              {response.body && (
                <div>
                  <p className="font-semibold mb-2">Cuerpo de la Respuesta:</p>
                  <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                    {response.body}
                  </pre>
                </div>
              )}
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">¿Qué está pasando?</h3>
            <p className="text-yellow-700">
              Cuando haces una petición HTTP:
              1. Tu navegador envía un mensaje al servidor usando el método {method}
              2. El servidor procesa tu petición
              3. El servidor responde con un código de estado ({response.status})
              4. También envía encabezados con información adicional
              5. Y finalmente, el contenido que solicitaste
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Ejercicios</h3>
            <p className="text-green-700 mb-4">
              Prueba hacer peticiones a estas URLs y observa las diferentes respuestas:
            </p>
            <ul className="list-disc list-inside space-y-1 text-green-600">
              <li>https://jsonplaceholder.typicode.com/posts/1 (GET)</li>
              <li>https://jsonplaceholder.typicode.com/posts (POST)</li>
              <li>https://jsonplaceholder.typicode.com/posts/1 (PUT)</li>
              <li>https://jsonplaceholder.typicode.com/posts/1 (DELETE)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <RealTimeExerciseWidget
      title="Explorador HTTP"
      description="Descubre cómo funcionan las peticiones HTTP en tiempo real"
      content={content}
    />
  );
}; 