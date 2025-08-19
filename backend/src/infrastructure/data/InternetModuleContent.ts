import { Module, ModuleDifficulty, ModuleStatus } from '@domain/entities/Module';
import { Lesson, LessonType, LessonStatus } from '@domain/entities/Lesson';
import { InternetModuleEvaluation } from './evaluations/InternetModuleEvaluation';

export const InternetModule = new Module(
  'internet-module',
  'Cómo Funciona Internet',
  'Descubre de manera sencilla cómo funciona Internet, desde direcciones IP hasta protocolos de comunicación, usando ejemplos de la vida cotidiana.',
  'como-funciona-internet',
  ModuleDifficulty.BEGINNER,
  90,
  1,
  ['networking', 'internet', 'web', 'protocolos'],
  '/images/modules/internet.svg',
  '/images/modules/internet-cover.jpg',
  [
    'Entender cómo se transmite información en Internet',
    'Aprender qué protocolos se usan y para qué sirven',
    'Descubrir cómo navegadores y servidores se comunican',
    'Comprender la seguridad en línea con HTTPS y SSL'
  ],
  [],
  ModuleStatus.PUBLISHED,
  new Date().toISOString(),
  new Date().toISOString(),
  new Date().toISOString(),
  [InternetModuleEvaluation]  
);

export const InternetLessons = [
  new Lesson(
    'fundamentos-internet',
    'internet-module',
    'Internet: Las Carreteras Invisibles',
    'Comprende cómo funciona Internet usando la analogía de carreteras invisibles por donde viajan los mensajes.',
    'fundamentos-de-internet',
    LessonType.CONCEPT,
    1,
    20,
    ['networking', 'internet', 'ip', 'dns'],
    [
      'Entender Internet como un sistema de carreteras invisibles',
      'Descubrir cómo viajan los datos entre dispositivos',
      'Aprender sobre direcciones IP y DNS'
    ],
    [],
    [
      {
        type: 'text',
        content: `# 🔌 ¿Cómo funciona Internet?

## 🧠 Imagina esto:

Internet es como un sistema de **carreteras invisibles** por donde viajan los **mensajes** entre tu dispositivo (celular, computadora) y otros lugares (como Google, Instagram o YouTube).

Cuando tú envías un mensaje de WhatsApp o ves un video en YouTube, estás usando estas carreteras digitales.

## 📦 ¿Cómo viajan los datos?

Cuando tú visitas una página web, estás enviando una **solicitud** (como una carta) que dice: "¡Hey, quiero ver este sitio!". Esa carta se manda usando **IP** y **DNS**:

### 🏠 IP (Internet Protocol)
Cada dispositivo conectado a Internet tiene una dirección única, como el número de tu casa. 

**Ejemplo**: \`142.250.72.206\` podría ser la dirección de Google.

### 📖 DNS (Domain Name System)
Transforma nombres fáciles como \`google.com\` en direcciones IP. Es como una guía telefónica que traduce nombres a números.

**¿Por qué necesitamos DNS?**
Imagínate tener que recordar \`142.250.72.206\` en vez de simplemente escribir \`google.com\`. ¡Sería imposible!`
      },
      {
        type: 'widget',
        content: {
          widgetType: 'IPAddressWidget',
          description: 'Descubre tu dirección IP actual y aprende qué tipo de dirección es.'
        }
      },
      {
        type: 'external-quiz',
        metadata: {
          title: 'Quiz: Fundamentos de Internet',
          description: 'Evalúa tu comprensión sobre direcciones IP, carreteras digitales y conceptos básicos de Internet.',
          url: 'https://forms.office.com/r/ENCY000q5L'
        }
      }
    ],
    ModuleDifficulty.BEGINNER,
    '/images/lessons/internet-basics.svg',
    LessonStatus.PUBLISHED,
    new Date().toISOString(),
    new Date().toISOString(),
    new Date().toISOString()
  ),

  new Lesson(
    'protocolos-internet',
    'internet-module',
    'Protocolos: Las Reglas de Conversación',
    'Aprende sobre los protocolos como reglas de conversación que permiten a los dispositivos entenderse.',
    'protocolos-internet',
    LessonType.CONCEPT,
    2,
    25,
    ['protocolos', 'http', 'https', 'websockets'],
    [
      'Entender qué son los protocolos de Internet',
      'Conocer los principales protocolos y sus usos',
      'Diferenciar entre HTTP y HTTPS'
    ],
    ['fundamentos-de-internet'],
    [
      {
        type: 'text',
        content: `# 🌐 Protocolos de Internet

Los **protocolos** son como **reglas de conversación** para que los dispositivos se entiendan.

Imagina que estás en un país extranjero. Necesitas reglas comunes (un idioma) para comunicarte. Los protocolos son ese "idioma" para las computadoras.

## 📋 Principales protocolos:

### 🌍 HTTP (HyperText Transfer Protocol)
- **¿Para qué sirve?** Transferir páginas web
- **Ejemplo**: Ver una página como \`wikipedia.org\`
- **Analogía**: Como pedir un libro en una biblioteca

### 🔒 HTTPS (HTTP Secure)
- **¿Para qué sirve?** Igual que HTTP pero con seguridad (cifrado)
- **Ejemplo**: Navegar en sitios bancarios o tiendas online
- **Analogía**: Como enviar una carta en un sobre cerrado

### 📁 FTP (File Transfer Protocol)
- **¿Para qué sirve?** Subir o descargar archivos a un servidor
- **Ejemplo**: Subir fotos a una página web
- **Analogía**: Como usar un servicio de mensajería para enviar paquetes

### ⚡ WebSockets
- **¿Para qué sirve?** Comunicación en tiempo real
- **Ejemplo**: Usado en chats en vivo o videojuegos online
- **Analogía**: Como una llamada telefónica donde ambos pueden hablar al mismo tiempo`
      },
      {
        type: 'widget',
        content: {
          widgetType: 'HTTPExplorerWidget',
          description: 'Explora cómo funcionan las peticiones HTTP en tiempo real.'
        }
      },
      {
        type: 'external-quiz',
        metadata: {
          title: 'Quiz: Protocolos de Internet',
          description: 'Pon a prueba tus conocimientos sobre HTTP, HTTPS, FTP y otros protocolos de comunicación.',
          url: ''
        }
      }
    ],
    ModuleDifficulty.BEGINNER,
    '/images/lessons/protocols.svg',
    LessonStatus.PUBLISHED,
    new Date().toISOString(),
    new Date().toISOString(),
    new Date().toISOString()
  ),

  new Lesson(
    'dns-detallado',
    'internet-module',
    'DNS: La Guía Telefónica de Internet',
    'Profundiza en cómo funciona el sistema DNS y sus diferentes tipos de registros.',
    'dns-detallado',
    LessonType.CONCEPT,
    3,
    30,
    ['dns', 'dominios', 'registros'],
    [
      'Entender el proceso completo de resolución DNS',
      'Conocer los diferentes tipos de registros DNS',
      'Practicar con ejemplos reales de DNS'
    ],
    ['protocolos-internet'],
    [
      {
        type: 'text',
        content: `# 🌍 ¿Qué es DNS y cómo funciona?

Cuando escribes \`www.netflix.com\`, el navegador **pregunta al DNS**: "¿Cuál es la dirección IP de este sitio?".

## 🔄 Proceso paso a paso:

1. **Tu navegador pregunta al DNS**: "¿Dónde está Netflix?"
2. **El DNS responde con la IP**: "Está en 52.84.150.20"
3. **El navegador va a esa IP**: Se conecta directamente al servidor
4. **Netflix aparece en tu pantalla**: ¡Misión cumplida!

Es como preguntar direcciones en la calle. En lugar de decir "la casa azul con jardín", dices "Calle Principal 123".

## 🧩 Tipos de registros DNS:

### 📍 Registro A
- **¿Qué hace?** Asocia un dominio a una dirección IP
- **Ejemplo**: \`google.com\` → \`142.250.72.206\`

### 🔗 Registro CNAME  
- **¿Qué hace?** Crea un alias de otro nombre
- **Ejemplo**: \`www.ejemplo.com\` puede ser un alias de \`ejemplo.com\`

### 📧 Registro MX
- **¿Qué hace?** Direcciones para correos electrónicos
- **Ejemplo**: Dice dónde entregar emails para \`@tuempresa.com\`

### 📝 Registro TXT
- **¿Qué hace?** Información adicional como verificación de seguridad
- **Ejemplo**: Verificar que realmente eres dueño del dominio`
      },
      {
        type: 'widget',
        content: {
          widgetType: 'DNSLookupWidget',
          description: 'Explora las direcciones IP detrás de tus sitios web favoritos.'
        }
      },
      {
        type: 'external-quiz',
        metadata: {
          title: 'Quiz: DNS y Registros',
          description: 'Evalúa tu conocimiento sobre el sistema DNS, tipos de registros y resolución de dominios.',
          url: 'https://forms.office.com/r/vv8b7cN37u'
        }
      }
    ],
    ModuleDifficulty.BEGINNER,
    '/images/lessons/dns-detailed.svg',
    LessonStatus.PUBLISHED,
    new Date().toISOString(),
    new Date().toISOString(),
    new Date().toISOString()
  ),

  new Lesson(
    'http-navegadores',
    'internet-module',
    'HTTP y los Navegadores',
    'Descubre cómo funcionan las solicitudes y respuestas HTTP, y los diferentes métodos de comunicación.',
    'http-navegadores',
    LessonType.CONCEPT,
    4,
    25,
    ['http', 'navegadores', 'solicitudes', 'respuestas'],
    [
      'Entender el ciclo de solicitud y respuesta HTTP',
      'Conocer los diferentes métodos HTTP',
      'Aprender sobre códigos de estado'
    ],
    ['dns-detallado'],
    [
      {
        type: 'text',
        content: `# 🌐 HTTP y los navegadores

Cuando entras a una página web, se usa el protocolo **HTTP** (o su versión segura **HTTPS**).

## 🚀 Ciclo de Solicitud y Respuesta:

Es como ir a un restaurante:

1. **El navegador envía una solicitud** al servidor (ej: "Muéstrame la página de inicio")
   - Como pedirle al mesero: "Quiero ver el menú"

2. **El servidor responde** con la información (HTML, imágenes, etc.)
   - Como cuando el mesero te trae el menú

3. **Tu navegador muestra la página**
   - Como cuando lees el menú que te trajeron

## 📬 Métodos HTTP:

### 🔍 GET - "Dame información"
- **¿Qué hace?** Pedir datos
- **Ejemplo**: Ver una foto en Instagram
- **Analogía**: Pedir ver el menú del restaurante

### 📤 POST - "Aquí tienes información"
- **¿Qué hace?** Enviar datos
- **Ejemplo**: Enviar un formulario de contacto
- **Analogía**: Hacer tu pedido al mesero

### ✏️ PUT - "Actualiza esto"
- **¿Qué hace?** Actualizar datos existentes
- **Ejemplo**: Cambiar tu foto de perfil
- **Analogía**: Cambiar tu pedido antes de que llegue

### 🗑️ DELETE - "Elimina esto"
- **¿Qué hace?** Eliminar algo
- **Ejemplo**: Borrar una publicación
- **Analogía**: Cancelar tu pedido

## 🎯 Códigos de Estado HTTP:

- **200**: "¡Todo bien!" - La página se cargó correctamente
- **404**: "No encontrado" - La página no existe
- **500**: "Error del servidor" - Algo falló en el servidor`
      },
      {
        type: 'external-quiz',
        metadata: {
          title: 'Quiz: Métodos HTTP',
          description: 'Pon a prueba tu comprensión sobre GET, POST, PUT, DELETE y códigos de respuesta HTTP.',
          url: 'https://forms.office.com/r/bKFukS5LZy'
        }
      }
    ],
    ModuleDifficulty.BEGINNER,
    '/images/lessons/http-browsers.svg',
    LessonStatus.PUBLISHED,
    new Date().toISOString(),
    new Date().toISOString(),
    new Date().toISOString()
  ),

  new Lesson(
    'seguridad-web',
    'internet-module',
    'Seguridad en la Web: HTTPS, SSL y Cookies',
    'Aprende sobre la seguridad en Internet, cookies, sesiones y encriptación de manera simple.',
    'seguridad-web',
    LessonType.CONCEPT,
    5,
    35,
    ['seguridad', 'https', 'ssl', 'cookies', 'cors'],
    [
      'Entender qué son las cookies y las sesiones',
      'Aprender sobre HTTPS y encriptación',
      'Conocer CORS y su importancia para la seguridad'
    ],
    ['http-navegadores'],
    [
      {
        type: 'text',
        content: `# 🔒 Seguridad en la Web

## 🍪 Cookies: Las Notas Adhesivas Digitales

Las **cookies** son pequeños archivos que un sitio web guarda en tu computadora para recordar cosas sobre ti.

### ¿Para qué sirven?
- Recordar tu idioma preferido
- Mantener tu sesión iniciada
- Guardar productos en tu carrito de compras
- Recordar tus preferencias

**Analogía**: Son como notas adhesivas que un comerciante pone en tu expediente para recordar que prefieres café sin azúcar.

## 💼 Sesiones: Tu Visita al Sitio Web

Las **sesiones** almacenan datos temporales mientras usas un sitio web.

**Ejemplo**: Mientras compras en línea, la sesión recuerda qué productos agregaste al carrito.

**Analogía**: Es como cuando vas a un hotel y te dan una llave temporal que funciona solo durante tu estadía.

## 🌍 CORS: El Guardia de Seguridad

**CORS** (Cross-Origin Resource Sharing) es una regla que dice **qué sitios pueden pedir datos a otros**.

### ¿Por qué es importante?
Protege tu información de sitios maliciosos que podrían intentar robar tus datos.

**Analogía**: Es como un guardia de seguridad que verifica si alguien tiene permiso para entrar a cierta área del edificio.

## 🔐 HTTPS: La Versión Segura de HTTP

**HTTPS** es como HTTP pero **con seguridad**. Protege tus datos para que nadie los vea mientras viajan por Internet.

### 🔒 ¿Qué es encriptación?

La encriptación transforma tus datos en algo ilegible para quien no tenga la "clave". Solo el destinatario puede leerlo.

**Ejemplo**: 
- Tu mensaje: "Hola amigo"
- Encriptado: "Km3x9 4m1g0"
- Solo quien tiene la clave puede leer "Hola amigo"

### 📄 Certificados SSL

Los sitios seguros usan **certificados digitales** que:
- Prueban que el sitio es confiable
- Encriptan toda la comunicación
- Aparecen como un candado 🔒 en tu navegador

**Analogía**: Es como el sello oficial en un documento importante que prueba que es auténtico.`
      },
      {
        type: 'external-quiz',
        metadata: {
          title: 'Quiz: Cookies y Seguridad Web',
          description: 'Evalúa tu conocimiento sobre cookies, SSL/TLS, certificados y seguridad en línea.',
          url: 'https://forms.office.com/r/Z3KnRuWRq3'
        }
      },
      {
        type: 'text',
        content: `## ✅ Resumen Final:

| Concepto   | ¿Qué es?                                 | Analogía |
| ---------- | ---------------------------------------- | -------- |
| **IP**         | Dirección única de cada dispositivo     | Número de casa |
| **DNS**        | Traductor de nombres a IP               | Guía telefónica |
| **HTTP/HTTPS** | Protocolos para acceder a páginas web   | Idioma para comunicarse |
| **Cookies**    | Archivos para recordar tu información   | Notas adhesivas |
| **SSL/TLS**    | Cifrado para mantener los datos seguros | Sobre cerrado para cartas |

## 🧠 Actividad Final:

**Simulación del proceso completo:**

Imagina que quieres ver un video en YouTube. Describe paso a paso:

1. ¿Qué pasa cuando escribes \`youtube.com\`?
2. ¿Cómo encuentra tu navegador la dirección IP?
3. ¿Qué protocolo usa para la comunicación?
4. ¿Cómo sabe el sitio que eres tú si ya habías iniciado sesión?
5. ¿Por qué ves el candado 🔒 en la barra de direcciones?

**Respuesta paso a paso:**
1. El navegador pregunta al DNS por la IP de YouTube
2. DNS responde con la dirección IP (ej: 208.65.153.238)
3. Tu navegador usa HTTPS para comunicarse de forma segura
4. Las cookies guardan tu información de sesión
5. El certificado SSL de YouTube asegura la conexión (candado 🔒)`
      },
      {
        type: 'external-quiz',
        metadata: {
          title: 'Quiz Final: Cómo Funciona Internet',
          description: 'Evalúa todo lo que has aprendido sobre Internet, protocolos, DNS y seguridad en línea. Este quiz completo pone a prueba tus conocimientos del módulo.',
          url: 'https://forms.office.com/r/ENCY000q5L'
        }
      }
    ],
    ModuleDifficulty.BEGINNER,
    '/images/lessons/web-security.svg',
    LessonStatus.PUBLISHED,
    new Date().toISOString(),
    new Date().toISOString(),
    new Date().toISOString()
  )
]; 