# Estructura de Atomic Design

Este proyecto implementa la metodología **Atomic Design** de Brad Frost para organizar los componentes de UI de manera escalable y mantenible.

## 🧩 Niveles de la Estructura

### 1. **Átomos** (`/src/components/atoms/`)
Los elementos más básicos de la interfaz. No pueden descomponerse más.

**Ejemplos implementados:**
- `Button` - Botones con diferentes variantes y estados
- `Input` - Campos de entrada con validación y estados

**Características:**
- Componentes reutilizables y sin dependencias
- Props bien tipadas con TypeScript
- Accesibilidad implementada (ARIA)
- Variantes y estados claramente definidos
- Tests unitarios incluidos

### 2. **Moléculas** (`/src/components/molecules/`)
Grupos de átomos que funcionan juntos como una unidad.

**Ejemplos implementados:**
- `SearchBox` - Combina Input + Button para búsquedas

**Características:**
- Combinan múltiples átomos
- Proporcionan funcionalidad específica
- Manejan estado interno simple
- Interfaces bien definidas

### 3. **Organismos** (`/src/components/organisms/`)
Grupos de moléculas y/o átomos que forman secciones complejas.

**Ejemplos a implementar:**
- `Header` - Navegación principal
- `ProductGrid` - Lista de productos
- `ContactForm` - Formulario completo

### 4. **Templates** (`/src/components/templates/`)
Layouts que definen la estructura de las páginas.

**Ejemplos a implementar:**
- `MainLayout` - Layout principal con header/footer
- `DashboardLayout` - Layout para panel de administración

### 5. **Páginas** (`/src/pages/`)
Instancias específicas de templates con contenido real.

## 🛠️ Herramientas y Tecnologías

### **Desarrollo**
- **React 19** - Framework principal
- **TypeScript** - Tipado estático
- **Vite** - Bundler y herramientas de desarrollo
- **Tailwind CSS** - Estilos utilitarios

### **Testing**
- **Vitest** - Framework de testing
- **React Testing Library** - Testing de componentes
- **@testing-library/jest-dom** - Matchers adicionales

### **Documentación**
- **Storybook** - Documentación interactiva de componentes
- **JSDoc** - Documentación inline del código

### **Calidad de Código**
- **ESLint** - Linting de JavaScript/TypeScript
- **Prettier** - Formateo de código
- **Husky** - Git hooks para pre-commits
- **lint-staged** - Linting de archivos en staging

## 📁 Estructura de Archivos

```
src/
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   │   ├── Button.tsx          # Componente principal
│   │   │   ├── Button.test.tsx     # Tests unitarios
│   │   │   ├── Button.stories.tsx  # Documentación Storybook
│   │   │   └── index.ts           # Exportaciones
│   │   └── index.ts               # Índice de átomos
│   ├── molecules/
│   ├── organisms/
│   ├── templates/
│   └── index.ts                   # Exportaciones principales
├── pages/                         # Páginas de la aplicación
├── hooks/                         # Custom hooks
├── utils/                         # Utilidades compartidas
├── types/                         # Definiciones de tipos
├── constants/                     # Constantes de la aplicación
├── services/                      # Servicios (APIs, etc.)
├── store/                         # Estado global
└── test/                          # Configuración de tests
```

## 🧪 Testing

### **Comandos disponibles:**
```bash
npm run test          # Ejecutar tests
npm run test:watch    # Tests en modo watch
npm run test:ui       # Interfaz visual de tests
npm run test:coverage # Reporte de cobertura
```

### **Estrategia de testing:**
- **Átomos**: Tests unitarios enfocados en props y comportamiento
- **Moléculas**: Tests de integración entre átomos
- **Organismos**: Tests de flujos de usuario
- **Páginas**: Tests end-to-end (E2E)

## 📚 Documentación con Storybook

```bash
npm run storybook     # Iniciar Storybook
npm run build-storybook # Build para producción
```

Cada componente incluye:
- **Stories** para diferentes estados
- **Controles** interactivos
- **Documentación** automática
- **Ejemplos** de uso

## 🎨 Estilos con Tailwind CSS

### **Configuración personalizada:**
- Paleta de colores del brand
- Espaciados adicionales
- Componentes base reutilizables

### **Clases de utilidad personalizadas:**
```css
.btn-primary    /* Botón primario */
.btn-secondary  /* Botón secundario */
.card          /* Tarjeta base */
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev           # Servidor de desarrollo
npm run build         # Build para producción
npm run preview       # Vista previa del build

# Testing
npm run test          # Tests unitarios
npm run test:ui       # Interfaz de tests

# Calidad de código
npm run lint          # Revisar código
npm run lint:fix      # Corregir automáticamente
npm run format        # Formatear código
npm run format:check  # Verificar formato

# Documentación
npm run storybook     # Documentación interactiva
```

## 🚀 Próximos Pasos

1. **Implementar más átomos**: Card, Badge, Avatar, etc.
2. **Crear organismos complejos**: Header, Footer, Navigation
3. **Definir templates de página**: MainLayout, DashboardLayout
4. **Implementar gestión de estado**: Context API o Zustand
5. **Añadir testing E2E**: Playwright o Cypress
6. **Configurar CI/CD**: GitHub Actions o Azure DevOps

## 📖 Referencias

- [Atomic Design por Brad Frost](https://atomicdesign.bradfrost.com/)
- [Storybook Documentation](https://storybook.js.org/docs)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Tailwind CSS](https://tailwindcss.com/docs) 