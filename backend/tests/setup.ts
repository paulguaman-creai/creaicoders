import 'dotenv/config';

// Configuración global para tests
process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'silent';

// Mock console methods para tests silenciosos
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Configuración de timeout global para tests
jest.setTimeout(10000);

// Setup before all tests
beforeAll(async () => {
  // Setup inicial si es necesario
});

// Cleanup after all tests
afterAll(async () => {
  // Cleanup si es necesario
});

// Reset entre tests
beforeEach(() => {
  jest.clearAllMocks();
});

export {}; 