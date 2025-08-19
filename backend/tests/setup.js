"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'silent';
global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
};
jest.setTimeout(10000);
beforeAll(async () => {
});
afterAll(async () => {
});
beforeEach(() => {
    jest.clearAllMocks();
});
//# sourceMappingURL=setup.js.map