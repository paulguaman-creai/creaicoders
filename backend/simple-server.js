const express = require('express');
const cors = require('cors');
// Agregamos fetch para hacer llamadas a APIs externas
const fetch = require('node-fetch');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());

// Datos educativos con ejercicios evaluables y quizzes
const educationalData = {
  modules: [
    {
      id: 'internet-basics',
      title: 'Cómo Funciona Internet',
      description: 'Aprende los fundamentos de Internet desde cero con ejercicios interactivos',
      estimatedTime: '45 min',
      difficulty: 'Principiante',
      imageUrl: '/api/placeholder/400/250',
      totalLessons: 4,
      completedLessons: 0,
      slug: 'como-funciona-internet'
    }
  ],
  
  lessons: {
    'internet-basics': [
      {
        id: 'lesson-1',
        title: '¿Qué es Internet?',
        slug: 'que-es-internet',
        moduleId: 'internet-basics',
        order: 1,
        estimatedTime: '10 min',
        difficulty: 'Principiante',
        isCompleted: false,
        points: 50
      },
      {
        id: 'lesson-2',
        title: 'Direcciones de Internet (IP)',
        slug: 'direcciones-ip',
        moduleId: 'internet-basics',
        order: 2,
        estimatedTime: '15 min',
        difficulty: 'Principiante',
        isCompleted: false,
        points: 75
      },
      {
        id: 'lesson-3',
        title: 'Protocolos de Internet',
        slug: 'protocolos-internet',
        moduleId: 'internet-basics',
        order: 3,
        estimatedTime: '12 min',
        difficulty: 'Intermedio',
        isCompleted: false,
        points: 60
      },
      {
        id: 'lesson-4',
        title: 'Práctica Final: Diagnóstico de Red',
        slug: 'practica-final',
        moduleId: 'internet-basics',
        order: 4,
        estimatedTime: '20 min',
        difficulty: 'Intermedio',
        isCompleted: false,
        points: 100
      }
    ]
  },

  lessonContent: {
    'lesson-1': {
      id: 'lesson-1',
      title: '¿Qué es Internet?',
      description: 'Descubre qué es Internet y cómo funciona esta increíble red global',
      contentBlocks: [
        {
          type: 'text',
          content: `# ¿Qué es Internet? 🌐

Internet es una **red global de computadoras** interconectadas que permite el intercambio de información entre millones de dispositivos en todo el mundo.

## Conceptos clave:

### 🏙️ Internet como una Ciudad
Imagina Internet como una ciudad gigante:
- **Calles**: Las conexiones de red
- **Direcciones**: Las direcciones IP  
- **Edificios**: Los servidores y computadoras
- **Carteros**: Los protocolos que entregan datos
- **Cartas**: Los paquetes de información

### 📡 Componentes principales:
1. **Dispositivos conectados** (computadoras, teléfonos, servidores)
2. **Protocolos de comunicación** (TCP/IP, HTTP, HTTPS)  
3. **Infraestructura física** (cables, routers, antenas)
4. **Proveedores de Internet** (ISP - Internet Service Providers)`
        },
        {
          type: 'external-quiz',
          metadata: {
            title: 'Quiz: Conceptos Básicos de Internet',
            description: 'Evalúa tu comprensión sobre qué es Internet, protocolos, infraestructura y componentes principales de la red global.',
            url: 'https://forms.office.com/r/ENCY000q5L'
          }
        },
        {
          type: 'text',
          content: `## 🔍 Datos curiosos sobre Internet:

- **Velocidad**: Los datos pueden viajar a casi la velocidad de la luz
- **Tamaño**: Hay más de 4.6 mil millones de usuarios de Internet en el mundo
- **Tráfico**: Se envían trillones de emails cada día
- **Crecimiento**: Internet crece exponencialmente cada año

### ¿Sabías qué?
Internet no tiene un "centro" o control central. Es una red **descentralizada** que funciona mediante la cooperación de miles de organizaciones en todo el mundo.`
        },
        {
          type: 'interactive',
          widgetType: 'real-time-exercise',
          metadata: {
            exerciseType: 'stats',
            title: '📊 Estadísticas de Internet en Tiempo Real',
            description: 'Explora datos actuales sobre el uso mundial de Internet'
          }
        }
      ]
    },

    'lesson-2': {
      id: 'lesson-2',
      title: 'Direcciones de Internet (IP)',
      description: 'Aprende qué son las direcciones IP y cómo funcionan con ejercicios prácticos',
      contentBlocks: [
        {
          type: 'text',
          content: `# Direcciones IP: El Sistema de Direcciones de Internet 📮

Una **dirección IP** (Internet Protocol) es un identificador único que se asigna a cada dispositivo conectado a Internet.

## ¿Cómo funcionan? 🏠

### Analogía con direcciones postales:
- **Tu casa** = Tu computadora/dispositivo
- **Dirección postal** = Dirección IP
- **Código postal** = Rango de red
- **Cartero** = Router/Internet

### Formato de IPv4:
\`\`\`
192.168.1.1
   ↑     ↑
 Red   Dispositivo
\`\`\`

Cada número puede ir de **0 a 255** (8 bits cada uno = 32 bits total)`
        },
        {
          type: 'interactive',
          widgetType: 'real-time-exercise',
          metadata: {
            exerciseType: 'ip',
            title: '🔍 Clasificador de IPs con Datos Reales',
            description: 'Clasifica direcciones IP reales obtenidas de APIs externas',
            note: 'Una dirección IP válida tiene 4 números separados por puntos, cada número entre 0-255'
          }
        },
        {
          type: 'interactive',
          widgetType: 'geolocation',
          metadata: {
            title: '🌍 Localizador de IP',
            description: 'Descubre la ubicación aproximada de una dirección IP',
            placeholder: 'Ejemplo: 8.8.8.8',
            note: 'La geolocalización IP es aproximada y se basa en bases de datos públicas'
          }
        },
        {
          type: 'text',
          content: `## Tipos de direcciones IP:

### 🏠 IPs Privadas (Red Local):
- \`192.168.x.x\` - Redes domésticas
- \`10.x.x.x\` - Redes empresariales grandes  
- \`172.16.x.x - 172.31.x.x\` - Redes empresariales medianas

### 🌐 IPs Públicas:
- Únicas en toda Internet
- Asignadas por tu proveedor de Internet (ISP)
- Visibles desde cualquier lugar del mundo

### 🔧 IPs Especiales:
- \`127.0.0.1\` - Localhost (tu propia máquina)
- \`0.0.0.0\` - Dirección no válida/sin asignar
- \`255.255.255.255\` - Broadcast (todos los dispositivos)`
        },
        {
          type: 'external-quiz',
          metadata: {
            title: 'Quiz: Direcciones IP',
            description: 'Pon a prueba tus conocimientos sobre direcciones IPv4, rangos válidos, IPs privadas vs públicas y localhost.',
            url: ''
          }
        }
      ]
    },

    'lesson-3': {
      id: 'lesson-3',
      title: 'Protocolos de Internet',
      description: 'Comprende los protocolos que hacen posible la comunicación en Internet',
      contentBlocks: [
        {
          type: 'text',
          content: `# Protocolos de Internet: Los Idiomas de la Red 🗣️

Los **protocolos** son reglas y estándares que permiten que los dispositivos se comuniquen en Internet.

## 🌐 HTTP vs HTTPS

### HTTP (HyperText Transfer Protocol)
- **Puerto**: 80
- **Seguridad**: ❌ No cifrado
- **Uso**: Sitios web básicos (cada vez menos común)

### HTTPS (HTTP Secure)  
- **Puerto**: 443
- **Seguridad**: ✅ Cifrado SSL/TLS
- **Uso**: Sitios web modernos y seguros

## 🔧 TCP/IP: La Base de Internet

### TCP (Transmission Control Protocol)
- Garantiza que los datos lleguen completos
- Ordena los paquetes correctamente
- Maneja errores y retransmisiones

### IP (Internet Protocol)
- Define cómo direccionar los paquetes
- Enruta los datos por la red
- No garantiza entrega (eso lo hace TCP)`
        },
        {
          type: 'interactive',
          widgetType: 'real-time-exercise',
          metadata: {
            exerciseType: 'url-analyzer',
            title: '🔍 Analizador de URLs',
            description: 'Analiza la estructura de diferentes URLs y sus protocolos',
            placeholder: 'Ejemplo: https://www.google.com/search?q=internet',
            note: 'Una URL completa incluye protocolo, dominio, puerto, ruta y parámetros'
          }
        },
        {
          type: 'interactive',
          widgetType: 'code-exercise',
          metadata: {
            exercise: {
              id: 'url-parser',
              title: '🛠️ Ejercicio: Parseador de URLs',
              description: 'Crea una función que extraiga el protocolo de una URL',
              startingCode: `// Completa esta función para extraer el protocolo de una URL
function getProtocol(url) {
  // Tu código aquí
  // Pista: usa split(':') o indexOf(':')
  
  let result = ""; // Define tu resultado aquí
  return result;
}

// El resultado debe ser asignado a la variable 'result'
const result = getProtocol("https://www.google.com");`,
              expectedOutput: 'https',
              testCases: [
                {
                  input: 'https://www.google.com',
                  expected: 'https',
                  description: 'URL HTTPS básica'
                },
                {
                  input: 'http://example.com',
                  expected: 'http',
                  description: 'URL HTTP básica'
                },
                {
                  input: 'ftp://files.example.com',
                  expected: 'ftp',
                  description: 'URL FTP'
                }
              ],
              hints: [
                'Las URLs tienen el formato: protocolo://dominio/ruta',
                'Puedes usar split(":") para dividir la URL',
                'El protocolo es la primera parte antes de "://"',
                'También puedes usar indexOf(":") para encontrar la posición'
              ],
              points: 25
            }
          }
        },
        {
          type: 'text',
          content: `## 📡 Otros Protocolos Importantes:

### 📧 Correo Electrónico:
- **SMTP**: Envío de emails (puerto 587/465)
- **POP3**: Descarga de emails (puerto 995)  
- **IMAP**: Acceso a emails en servidor (puerto 993)

### 📂 Transferencia de Archivos:
- **FTP**: Transferencia básica (puerto 21)
- **SFTP**: FTP seguro sobre SSH (puerto 22)
- **FTPS**: FTP con SSL/TLS

### 🔒 Seguridad:
- **SSL/TLS**: Cifrado de conexiones
- **SSH**: Acceso remoto seguro (puerto 22)
- **VPN**: Redes privadas virtuales

## ¿Por qué son importantes?

Los protocolos aseguran que:
1. **Todos hablen el mismo idioma** 🗣️
2. **Los datos lleguen íntegros** ✅  
3. **Haya seguridad** 🔒
4. **La comunicación sea eficiente** ⚡`
        }
      ]
    },

    'lesson-4': {
      id: 'lesson-4',
      title: 'Práctica Final: Diagnóstico de Red',
      description: 'Pon a prueba todo lo aprendido con ejercicios prácticos de diagnóstico',
      contentBlocks: [
        {
          type: 'text',
          content: `# 🎯 Práctica Final: Diagnóstico de Red

¡Es hora de aplicar todo lo que has aprendido! En esta lección final, realizarás un diagnóstico completo de red usando todas las herramientas y conceptos vistos.

## 🧑‍💻 Perfil: Eres un Técnico de Redes

Acabas de recibir un reporte de problemas de conectividad. Tu trabajo es:

1. **Analizar** las direcciones IP reportadas
2. **Verificar** la conectividad de servicios
3. **Identificar** posibles problemas de seguridad
4. **Documentar** tus hallazgos

## 📋 Casos de Estudio

### Caso 1: Oficina Remota
Una oficina remota reporta problemas para acceder a ciertos sitios web.`
        },
        {
          type: 'interactive',
          widgetType: 'real-time-exercise',
          metadata: {
            exerciseType: 'dns',
            title: '🌐 Análisis de Conectividad DNS en Tiempo Real',
            description: 'Prueba la conectividad a sitios web reales y analiza los resultados'
          }
        },
        {
          type: 'external-quiz',
          metadata: {
            title: '🕵️ Caso 1: Diagnóstico de Conectividad',
            description: 'Resuelve casos prácticos de diagnóstico de red, problemas de conectividad y herramientas de red como ping y traceroute.',
            url: 'https://forms.gle/network-troubleshooting-quiz'
          }
        },
        {
          type: 'interactive',
          widgetType: 'code-exercise',
          metadata: {
            exercise: {
              id: 'network-validator',
              title: '🛠️ Ejercicio Final: Validador de Red Completo',
              description: 'Crea una función que valide tanto IPs como URLs y determine si son seguras',
              startingCode: `// Crea una función que analice si una dirección es segura
function isSecureAddress(address) {
  // Determina si es IP o URL
  // Para IPs: considera seguras las privadas (192.168.x.x, 10.x.x.x, 172.16-31.x.x)
  // Para URLs: considera seguras solo las HTTPS
  
  let result = "unknown"; // Cambia esto por "secure", "insecure", o "invalid"
  
  // Tu código aquí
  
  return result;
}

// Test con diferentes tipos de direcciones
const result = isSecureAddress("https://www.google.com");`,
              expectedOutput: 'secure',
              testCases: [
                {
                  input: 'https://www.google.com',
                  expected: 'secure',
                  description: 'URL HTTPS (segura)'
                },
                {
                  input: 'http://example.com',
                  expected: 'insecure',
                  description: 'URL HTTP (insegura)'
                },
                {
                  input: '192.168.1.1',
                  expected: 'secure',
                  description: 'IP privada (segura)'
                },
                {
                  input: '8.8.8.8',
                  expected: 'insecure',
                  description: 'IP pública (insegura para red local)'
                },
                {
                  input: 'invalid-address',
                  expected: 'invalid',
                  description: 'Dirección inválida'
                }
              ],
              hints: [
                'Usa includes() para verificar si contiene "https://" o "http://"',
                'Para IPs, verifica si comienza con "192.168." o "10." o "172."',
                'Puedes usar split(".") para analizar los octetos de IP',
                'Recuerda manejar el caso de direcciones inválidas'
              ],
              points: 40
            }
          }
        },
        {
          type: 'text',
          content: `## 🎉 ¡Felicitaciones!

Has completado el módulo "Cómo Funciona Internet". Ahora tienes una comprensión sólida de:

### ✅ Conceptos Dominados:
- **Internet y sus componentes** 🌐
- **Direcciones IP y tipos** 📮
- **Protocolos de comunicación** 🗣️
- **Análisis de URLs** 🔍
- **Seguridad básica en redes** 🔒
- **Diagnóstico de problemas** 🛠️

### 🚀 Próximos Pasos:
1. **Aplicar** estos conocimientos en proyectos reales
2. **Explorar** herramientas avanzadas de red
3. **Profundizar** en seguridad cibernética
4. **Estudiar** arquitecturas de red más complejas

### 📊 Tu Progreso:
- **Lecciones completadas**: 4/4
- **Ejercicios realizados**: Múltiples tipos
- **Habilidades nuevas**: Diagnóstico de red

¡Continúa aprendiendo y explorando el fascinante mundo de las redes e Internet! 🎓`
        }
      ]
    }
  }
};

// Rutas de la API
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Educational API Server running!' });
});

app.get('/api/modules', (req, res) => {
  res.json(educationalData.modules);
});

app.get('/api/modules/:slug', (req, res) => {
  const module = educationalData.modules.find(m => m.slug === req.params.slug);
  if (!module) {
    return res.status(404).json({ error: 'Module not found' });
  }
  res.json(module);
});

app.get('/api/modules/:moduleId/lessons', (req, res) => {
  const lessons = educationalData.lessons[req.params.moduleId];
  if (!lessons) {
    return res.status(404).json({ error: 'Module lessons not found' });
  }
  res.json(lessons);
});

app.get('/api/lessons/:lessonId', (req, res) => {
  const lessonContent = educationalData.lessonContent[req.params.lessonId];
  if (!lessonContent) {
    return res.status(404).json({ error: 'Lesson content not found' });
  }
  res.json(lessonContent);
});

// Nueva ruta para actualizar progreso
app.post('/api/lessons/:lessonId/complete', (req, res) => {
  const { lessonId } = req.params;
  const { score, totalPoints } = req.body;
  
  // En una implementación real, aquí guardarías en base de datos
  console.log(`Lesson ${lessonId} completed with score: ${score}/${totalPoints}`);
  
  res.json({ 
    success: true, 
    message: 'Progress updated',
    score,
    totalPoints 
  });
});

// Nuevo endpoint para obtener IP pública real usando ipify.org
app.get('/api/network/public-ip', async (req, res) => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    
    res.json({
      success: true,
      publicIP: data.ip,
      timestamp: new Date().toISOString(),
      source: 'ipify.org'
    });
  } catch (error) {
    console.error('Error fetching public IP:', error);
    res.status(500).json({
      success: false,
      error: 'No se pudo obtener la IP pública',
      fallback: '203.0.113.1' // IP de ejemplo según RFC5737
    });
  }
});

// Endpoint para validar URLs y obtener información real
app.post('/api/network/analyze-url', async (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ 
      success: false, 
      error: 'URL requerida' 
    });
  }

  try {
    // Análisis básico de la URL
    const urlObj = new URL(url);
    const isSecure = urlObj.protocol === 'https:';
    const domain = urlObj.hostname;
    
    // Intentar hacer una petición HEAD para verificar si existe
    let statusCode = null;
    let responseTime = null;
    let isOnline = false;
    
    try {
      const startTime = Date.now();
      const response = await fetch(url, { 
        method: 'HEAD',
        timeout: 5000,
        headers: {
          'User-Agent': 'CreaiCoders-Learning-Platform/1.0'
        }
      });
      responseTime = Date.now() - startTime;
      statusCode = response.status;
      isOnline = response.ok;
    } catch (fetchError) {
      console.log('URL no accesible:', fetchError.message);
    }

    res.json({
      success: true,
      analysis: {
        url,
        protocol: urlObj.protocol.replace(':', ''),
        domain,
        port: urlObj.port || (isSecure ? 443 : 80),
        isSecure,
        isOnline,
        statusCode,
        responseTime,
        security: {
          level: isSecure ? 'alto' : 'bajo',
          recommendation: isSecure ? 
            'Conexión segura (HTTPS)' : 
            'Considera usar HTTPS para mayor seguridad'
        }
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'URL inválida',
      details: error.message
    });
  }
});

// Endpoint para generar ejercicios dinámicos de IP
app.get('/api/network/ip-exercise', async (req, res) => {
  try {
    // Obtener IP pública real
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const realIP = ipData.ip;
    
    // Generar IPs para el ejercicio
    const generateRandomIP = () => {
      return [
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256)
      ].join('.');
    };
    
    const privateRanges = [
      '192.168.' + Math.floor(Math.random() * 256) + '.' + Math.floor(Math.random() * 256),
      '10.' + Math.floor(Math.random() * 256) + '.' + Math.floor(Math.random() * 256) + '.' + Math.floor(Math.random() * 256),
      '172.' + (16 + Math.floor(Math.random() * 16)) + '.' + Math.floor(Math.random() * 256) + '.' + Math.floor(Math.random() * 256)
    ];
    
    const exercise = {
      id: 'dynamic-ip-' + Date.now(),
      title: 'Clasificación de Direcciones IP Reales',
      description: 'Clasifica las siguientes direcciones IP reales como públicas o privadas',
      realData: {
        yourPublicIP: realIP,
        note: 'Esta es tu IP pública real obtenida de ipify.org'
      },
      questions: [
        {
          ip: realIP,
          type: 'publica',
          explanation: 'Esta es tu dirección IP pública real, asignada por tu proveedor de Internet'
        },
        {
          ip: privateRanges[0],
          type: 'privada',
          explanation: 'Rango 192.168.x.x - Red privada clase C'
        },
        {
          ip: privateRanges[1],
          type: 'privada', 
          explanation: 'Rango 10.x.x.x - Red privada clase A'
        },
        {
          ip: generateRandomIP(),
          type: 'publica',
          explanation: 'Dirección IP pública - accesible desde Internet'
        }
      ].sort(() => Math.random() - 0.5), // Mezclar preguntas
      points: 25
    };
    
    res.json({
      success: true,
      exercise,
      metadata: {
        generated: new Date().toISOString(),
        source: 'ipify.org + algoritmo dinámico'
      }
    });
    
  } catch (error) {
    console.error('Error generating IP exercise:', error);
    res.status(500).json({
      success: false,
      error: 'No se pudo generar el ejercicio',
      fallbackExercise: {
        id: 'static-ip-fallback',
        title: 'Clasificación de Direcciones IP',
        questions: [
          { ip: '192.168.1.1', type: 'privada' },
          { ip: '8.8.8.8', type: 'publica' }
        ]
      }
    });
  }
});

// Endpoint para ejercicios de DNS en tiempo real
app.get('/api/network/dns-exercise', async (req, res) => {
  const popularDomains = [
    'google.com', 'github.com', 'stackoverflow.com', 
    'mozilla.org', 'wikipedia.org', 'microsoft.com'
  ];
  
  try {
    // Seleccionar un dominio aleatorio para el ejercicio
    const selectedDomain = popularDomains[Math.floor(Math.random() * popularDomains.length)];
    
    // Intentar resolver información del dominio
    const urls = [
      `https://${selectedDomain}`,
      `http://${selectedDomain}`
    ];
    
    const results = [];
    for (const url of urls) {
      try {
        const startTime = Date.now();
        const response = await fetch(url, { 
          method: 'HEAD', 
          timeout: 3000,
          headers: {
            'User-Agent': 'CreaiCoders-Learning-Platform/1.0'
          }
        });
        const responseTime = Date.now() - startTime;
        
        results.push({
          url,
          accessible: response.ok,
          statusCode: response.status,
          responseTime,
          secure: url.startsWith('https')
        });
      } catch (error) {
        results.push({
          url,
          accessible: false,
          error: error.message,
          secure: url.startsWith('https')
        });
      }
    }
    
    res.json({
      success: true,
      exercise: {
        id: 'dns-real-' + Date.now(),
        title: `Análisis de Conectividad: ${selectedDomain}`,
        description: `Analiza los resultados reales de conectividad para ${selectedDomain}`,
        domain: selectedDomain,
        testResults: results,
        questions: [
          {
            question: `¿Cuál es la diferencia principal entre HTTP y HTTPS para ${selectedDomain}?`,
            options: [
              'HTTP es más rápido',
              'HTTPS proporciona cifrado y seguridad',
              'No hay diferencia',
              'HTTP funciona mejor'
            ],
            correct: 1,
            points: 10
          },
          {
            question: 'Basándote en los resultados, ¿qué protocolo recomendarías?',
            options: [
              'HTTP por simplicidad',
              'HTTPS por seguridad', 
              'Cualquiera de los dos',
              'Depende del navegador'
            ],
            correct: 1,
            points: 15
          }
        ]
      },
      metadata: {
        tested: new Date().toISOString(),
        realTime: true
      }
    });
    
  } catch (error) {
    console.error('Error in DNS exercise:', error);
    res.status(500).json({
      success: false,
      error: 'Error generando ejercicio DNS'
    });
  }
});

// Endpoint para obtener estadísticas de Internet en tiempo real
app.get('/api/network/internet-stats', async (req, res) => {
  try {
    // Simular obtención de estadísticas (en una implementación real podrías usar APIs como worldometers)
    const currentYear = new Date().getFullYear();
    const stats = {
      timestamp: new Date().toISOString(),
      year: currentYear,
      estimatedUsers: Math.floor(4.9 + Math.random() * 0.5), // Billones
      estimatedWebsites: Math.floor(1.8 + Math.random() * 0.2), // Billones  
      emailsSentToday: Math.floor(300 + Math.random() * 50), // Billones
      searchesToday: Math.floor(8.5 + Math.random() * 1), // Billones
      dataTraffic: Math.floor(4.8 + Math.random() * 0.5), // Zettabytes por año
      activeDevices: Math.floor(50 + Math.random() * 10), // Billones
      source: 'Estimaciones basadas en tendencias actuales',
      disclaimer: 'Datos aproximados para fines educativos'
    };
    
    res.json({
      success: true,
      stats,
      formatted: {
        users: `${stats.estimatedUsers} mil millones de usuarios`,
        websites: `${stats.estimatedWebsites} mil millones de sitios web`,
        emails: `${stats.emailsSentToday} mil millones de emails hoy`,
        searches: `${stats.searchesToday} mil millones de búsquedas hoy`,
        traffic: `${stats.dataTraffic} zettabytes de tráfico anual`,
        devices: `${stats.activeDevices} mil millones de dispositivos activos`
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error obteniendo estadísticas'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Educational API server running on port ${PORT}`);
  console.log(`📚 Content includes interactive quizzes and code exercises`);
  console.log(`🔗 Frontend should connect to: http://localhost:${PORT}`);
}); 