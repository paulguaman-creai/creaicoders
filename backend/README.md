# Backend - Arquitectura Hexagonal

## 🏗️ Arquitectura

Este proyecto implementa **Clean Architecture** (Arquitectura Hexagonal) con **TypeScript** siguiendo principios DDD (Domain-Driven Design).

### Principios Implementados

- ✅ **Separation of Concerns**: Cada capa tiene responsabilidades específicas
- ✅ **Dependency Inversion**: Las dependencias apuntan hacia el dominio
- ✅ **SOLID Principles**: Especialmente SRP, OCP y DIP
- ✅ **Domain-Driven Design**: Entities, Value Objects, Repositories
- ✅ **Ports & Adapters**: Interfaces para desacoplar capas

## 📁 Estructura del Proyecto

```
src/
├── domain/                    # 🏛️ Capa de Dominio
│   ├── entities/             # Entidades de negocio
│   │   └── User.ts
│   ├── value-objects/        # Objetos de valor
│   │   ├── UserEmail.ts
│   │   └── UserPassword.ts
│   ├── repositories/         # Interfaces de repositorio (Puertos)
│   │   └── UserRepository.ts
│   └── services/            # Servicios de dominio
│
├── application/              # 🔄 Capa de Aplicación
│   ├── use-cases/           # Casos de uso
│   │   └── CreateUserUseCase.ts
│   ├── dtos/                # Data Transfer Objects
│   │   └── CreateUserDto.ts
│   └── ports/               # Puertos adicionales
│
├── infrastructure/          # 🔧 Capa de Infraestructura
│   ├── adapters/
│   │   ├── persistence/     # Adaptadores de BD
│   │   ├── web/            # Adaptadores Web (REST)
│   │   │   ├── controllers/ # Controladores REST
│   │   │   ├── routes/     # Definición de rutas
│   │   │   └── middleware/ # Middleware HTTP
│   │   └── external/       # Servicios externos
│   └── config/             # Configuraciones
│       ├── app.ts          # Config de aplicación
│       └── logger.ts       # Config de logging
│
├── shared/                  # 🔗 Código Compartido
│   ├── types/              # Tipos comunes
│   ├── utils/              # Utilidades
│   └── constants/          # Constantes
│
└── main.ts                 # 🚀 Punto de entrada
```

## 🔧 Tecnologías

### Core
- **Node.js** + **TypeScript** - Runtime y tipado
- **Express.js** - Framework web
- **Zod** - Validación de esquemas
- **Winston** - Logging estructurado

### Testing
- **Jest** - Framework de testing
- **Supertest** - Testing de APIs HTTP

### Desarrollo
- **ESLint** + **Prettier** - Calidad de código
- **Nodemon** - Hot reload en desarrollo
- **ts-node** - Ejecución directa de TypeScript

### Seguridad
- **Helmet** - Headers de seguridad
- **CORS** - Cross-Origin Resource Sharing
- **Crypto** - Hash de contraseñas

## 🚀 Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Servidor con hot reload
npm run build        # Compilar TypeScript
npm run start        # Ejecutar versión compilada

# Testing
npm run test         # Ejecutar todos los tests
npm run test:watch   # Tests en modo watch
npm run test:coverage # Reporte de cobertura
npm run test:unit    # Solo tests unitarios
npm run test:integration # Solo tests de integración
npm run test:e2e     # Solo tests E2E

# Calidad de código
npm run lint         # Linting
npm run lint:fix     # Corregir errores de linting
npm run format       # Formatear código
npm run format:check # Verificar formato

# Utilidades
npm run clean        # Limpiar archivos compilados
```

## 🎯 Ejemplos de Uso

### 1. Crear Nueva Entidad

```typescript
// 1. Definir entidad en domain/entities/
export class Product implements DomainEntity {
  readonly id: UUID;
  // ... implementación
}

// 2. Crear value objects en domain/value-objects/
export class ProductName extends ValueObject<string> {
  // ... validación y lógica
}

// 3. Definir repositorio en domain/repositories/
export interface ProductRepository {
  save(product: Product): Promise<Product>;
  // ... métodos CRUD
}
```

### 2. Crear Caso de Uso

```typescript
// application/use-cases/CreateProductUseCase.ts
export class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository
  ) {}

  async execute(dto: CreateProductDto): Promise<Result<Product, Error>> {
    // Lógica del caso de uso
  }
}
```

### 3. Crear Controlador REST

```typescript
// infrastructure/adapters/web/controllers/ProductController.ts
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    // Manejo de HTTP y delegación al caso de uso
  }
}
```

## 🧪 Testing

### Cobertura Mínima
- **Unidades**: 80% en lógica de dominio
- **Integración**: APIs y repositorios
- **E2E**: Flujos completos de usuario

### Estrategia por Capa

```typescript
// Tests Unitarios - Dominio
describe('User Entity', () => {
  it('should create valid user', () => {
    // Test de lógica de negocio
  });
});

// Tests de Integración - Aplicación
describe('CreateUserUseCase', () => {
  it('should create user successfully', () => {
    // Test con mocks de repositorio
  });
});

// Tests E2E - API completa
describe('POST /api/users', () => {
  it('should create user via HTTP', () => {
    // Test de extremo a extremo
  });
});
```

## 🔒 Configuración de Seguridad

### Variables de Entorno (.env)
```env
NODE_ENV=development
PORT=3000
JWT_SECRET=tu-secreto-jwt-super-seguro
CORS_ORIGIN=http://localhost:3001
LOG_LEVEL=info
```

### Middleware de Seguridad
- **Helmet**: Headers de seguridad HTTP
- **CORS**: Control de acceso entre dominios
- **Rate Limiting**: (TODO) Protección contra ataques DDoS
- **Input Validation**: Validación estricta con Zod

## 📈 Monitoreo y Logging

### Logging Estructurado
```typescript
logger.info('User created', { 
  userId: user.id, 
  email: user.email.getValue() 
});
```

### Health Checks
- `GET /health` - Estado del servidor
- `GET /api` - Estado de la API

## 🐳 Docker (TODO)

```dockerfile
# Dockerfile para containerización
FROM node:18-alpine
# ... configuración
```

## 🔄 CI/CD (TODO)

- **GitHub Actions** / **Azure DevOps**
- Pipeline: lint → test → build → deploy
- Cobertura de tests automática
- Deployment a staging/producción

## 📝 Próximos Pasos

1. **Base de Datos**: Implementar Prisma ORM
2. **Autenticación**: JWT + middleware de auth
3. **Validación**: Middleware de validación automática
4. **Testing**: Completar suite de tests
5. **Documentación**: Swagger/OpenAPI
6. **Monitoring**: Health checks + métricas
7. **Docker**: Containerización completa
8. **CI/CD**: Pipeline automático

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama para feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Agregar nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abrir Pull Request

---

**Arquitectura creada siguiendo principios de Clean Architecture y buenas prácticas de TypeScript** 🏗️ 