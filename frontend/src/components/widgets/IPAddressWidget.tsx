import React, { useState, useEffect } from 'react';
import { RealTimeExerciseWidget } from '../RealTimeExerciseWidget';

interface IPInfo {
  ip: string;
  type: 'IPv4' | 'IPv6';
  isPrivate: boolean;
  description: string;
}

export const IPAddressWidget: React.FC = () => {
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIpInfo = async () => {
      try {
        // Usando ipify para obtener la IP pública
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        
        const ip = data.ip;
        const isIPv6 = ip.includes(':');
        const isPrivate = ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.');
        
        let description = '';
        if (isPrivate) {
          description = 'Esta es una dirección IP privada, usada solo en tu red local (como el número de un apartamento dentro de un edificio).';
        } else {
          description = 'Esta es tu dirección IP pública, la que te identifica en Internet (como la dirección de tu casa en la ciudad).';
        }

        setIpInfo({
          ip,
          type: isIPv6 ? 'IPv6' : 'IPv4',
          isPrivate,
          description
        });
      } catch (err) {
        setError('No pudimos obtener tu dirección IP. ¿Estás conectado a Internet?');
      } finally {
        setLoading(false);
      }
    };

    fetchIpInfo();
  }, []);

  const content = (
    <div className="space-y-4">
      {loading && <p className="text-gray-600">Buscando tu dirección IP...</p>}
      
      {error && (
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}
      
      {ipInfo && (
        <div className="space-y-4">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-2">Tu Dirección IP</h3>
            <p className="text-3xl font-mono text-blue-700 mb-2">{ipInfo.ip}</p>
            <p className="text-blue-600">Tipo: {ipInfo.type}</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Qué significa?</h3>
            <p className="text-gray-700">{ipInfo.description}</p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-2">¿Sabías que...?</h3>
            <ul className="list-disc list-inside space-y-2 text-green-700">
              <li>Cada dispositivo conectado a Internet necesita una dirección IP única</li>
              <li>Las direcciones IPv4 tienen 4 números separados por puntos</li>
              <li>Las direcciones IPv6 son más largas y usan números y letras</li>
              <li>Tu dirección IP puede cambiar cuando te conectas a diferentes redes</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <RealTimeExerciseWidget
      title="Descubre tu Dirección IP"
      description="Este widget muestra y explica tu dirección IP actual"
      content={content}
    />
  );
}; 