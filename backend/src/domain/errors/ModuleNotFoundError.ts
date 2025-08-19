export class ModuleNotFoundError extends Error {
  constructor(slug: string) {
    super(`Module with slug '${slug}' not found`);
    this.name = 'ModuleNotFoundError';
  }
} 