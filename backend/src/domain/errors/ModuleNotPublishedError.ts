export class ModuleNotPublishedError extends Error {
  constructor(slug: string) {
    super(`Module with slug '${slug}' is not published`);
    this.name = 'ModuleNotPublishedError';
  }
} 