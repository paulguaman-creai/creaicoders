import React, { useState } from 'react';
import { RealTimeExerciseWidget } from '../RealTimeExerciseWidget';

interface DNSResult {
  domain: string;
  ip: string;
  type: string;
}

export const DNSLookupWidget: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState<DNSResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async () => {
    if (!domain) {
      setError('Por favor ingresa un nombre de dominio');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Usando Google DNS over HTTPS para la resolución
      const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
      const data = await response.json();

      if (data.Answer) {
        const dnsResults = data.Answer.map((answer: any) => ({
          domain: answer.name,
          ip: answer.data,
          type: 'A'
        }));
        setResults(dnsResults);
      } else {
        setError('No se encontraron registros DNS para este dominio');
      }
    } catch (err) {
      setError('Hubo un error al consultar el DNS. Intenta con otro dominio.');
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <div className="space-y-6">
      <div className="flex gap-4">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Ejemplo: google.com"
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={handleLookup}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-4">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dominio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dirección IP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((result, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {result.domain}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.ip}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">¿Qué significa esto?</h3>
            <p className="text-yellow-700">
              Cuando escribes "{domain}" en tu navegador, tu computadora primero pregunta al DNS
              cuál es la dirección IP de ese sitio. Es como buscar un número de teléfono en la guía
              telefónica usando el nombre de un negocio. Una vez que tiene la dirección IP, tu
              navegador puede conectarse directamente al servidor web.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Ejercicio</h3>
            <p className="text-green-700 mb-4">
              Intenta buscar estos dominios populares y compara sus direcciones IP:
            </p>
            <ul className="list-disc list-inside space-y-1 text-green-600">
              <li>google.com</li>
              <li>facebook.com</li>
              <li>twitter.com</li>
              <li>amazon.com</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <RealTimeExerciseWidget
      title="Explorador DNS"
      description="Descubre las direcciones IP detrás de los nombres de dominio"
      content={content}
    />
  );
}; 