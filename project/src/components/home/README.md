# Componentes de la Página Principal

Esta carpeta contiene todos los componentes modulares de la página principal (`/`) del proyecto.

## Estructura de Archivos

```
home/
├── Header.tsx              # Encabezado principal con título y descripción
├── ApiInfo.tsx             # Información sobre JSONPlaceholder
├── EndpointsList.tsx       # Lista de endpoints para probar
├── PostmanExamples.tsx     # Ejemplos de uso en Postman
├── PostmanSteps.tsx        # Pasos para usar Postman
├── HttpMethods.tsx         # Explicación de métodos HTTP
├── Footer.tsx              # Pie de página con enlaces
├── index.ts                # Exportaciones de todos los componentes
└── README.md               # Este archivo
```

## Componentes

### Header
- **Propósito**: Muestra el título principal y descripción de la página
- **Props**: Ninguna
- **Uso**: `<Header />`

### ApiInfo
- **Propósito**: Explica qué es JSONPlaceholder y muestra la URL base
- **Props**: Ninguna
- **Uso**: `<ApiInfo />`

### EndpointsList
- **Propósito**: Renderiza la lista de endpoints disponibles para probar
- **Props**: `endpoints: Endpoint[]`
- **Uso**: `<EndpointsList endpoints={endpoints} />`

### PostmanExamples
- **Propósito**: Muestra ejemplos de cómo configurar requests en Postman
- **Props**: `examples: PostmanExample[]`
- **Uso**: `<PostmanExamples examples={postmanExamples} />`

### PostmanSteps
- **Propósito**: Lista los pasos para usar Postman
- **Props**: Ninguna
- **Uso**: `<PostmanSteps />`

### HttpMethods
- **Propósito**: Explica los diferentes métodos HTTP
- **Props**: Ninguna
- **Uso**: `<HttpMethods />`

### Footer
- **Propósito**: Enlaces y información adicional
- **Props**: Ninguna
- **Uso**: `<Footer />`

## Tipos

Los tipos están definidos en `../../types/home.ts`:

- `Endpoint`: Estructura de un endpoint de la API
- `PostmanExample`: Ejemplo de configuración en Postman
- `Step`: Paso en el proceso de uso
- `HttpMethod`: Método HTTP con su descripción

## Datos

Los datos están centralizados en `../../data/homeData.ts`:

- `endpoints`: Array de endpoints disponibles
- `postmanExamples`: Ejemplos de configuración

## Uso

```tsx
import {
  Header,
  ApiInfo,
  EndpointsList,
  PostmanExamples,
  PostmanSteps,
  HttpMethods,
  Footer
} from '../components/home';
import { endpoints, postmanExamples } from '../data/homeData';

export default function Home() {
  return (
    <div>
      <Header />
      <ApiInfo />
      <EndpointsList endpoints={endpoints} />
      <PostmanExamples examples={postmanExamples} />
      <PostmanSteps />
      <HttpMethods />
      <Footer />
    </div>
  );
}
```

## Beneficios de esta Estructura

1. **Modularidad**: Cada componente tiene una responsabilidad específica
2. **Reutilización**: Los componentes pueden ser reutilizados en otras páginas
3. **Mantenibilidad**: Es más fácil mantener y modificar componentes pequeños
4. **Testabilidad**: Cada componente puede ser testeado independientemente
5. **Legibilidad**: El código es más fácil de leer y entender
6. **Escalabilidad**: Fácil agregar nuevos componentes o modificar existentes
