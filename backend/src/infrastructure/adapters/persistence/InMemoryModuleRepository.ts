import { Module, ModuleStatus } from '@domain/entities/Module';
import { ModuleRepository } from '@domain/repositories/ModuleRepository';
import { PaginatedResult, PaginationParams } from '@shared/types/common';

export class InMemoryModuleRepository implements ModuleRepository {
  private modules: Module[] = [];

  async save(module: Module): Promise<Module> {
    const existingIndex = this.modules.findIndex(m => m.id === module.id);
    if (existingIndex >= 0) {
      this.modules[existingIndex] = module;
    } else {
      this.modules.push(module);
    }
    return module;
  }

  async findById(id: string): Promise<Module | null> {
    return this.modules.find(module => module.id === id) ?? null;
  }

  async findBySlug(slug: string): Promise<Module | null> {
    return this.modules.find(module => module.slug === slug) ?? null;
  }

  async findAll(params: PaginationParams): Promise<PaginatedResult<Module>> {
    const { page = 1, limit = 10 } = params;
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = this.modules
      .sort((a, b) => a.order - b.order)
      .slice(start, end);

    return {
      data,
      pagination: {
        total: this.modules.length,
        page,
        limit,
        totalPages: Math.ceil(this.modules.length / limit),
        hasNext: end < this.modules.length,
        hasPrev: page > 1
      }
    };
  }

  async findPublished(params: PaginationParams): Promise<PaginatedResult<Module>> {
    const publishedModules = this.modules
      .filter(module => module.status === ModuleStatus.PUBLISHED)
      .sort((a, b) => a.order - b.order);

    const { page = 1, limit = 10 } = params;
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = publishedModules.slice(start, end);

    return {
      data,
      pagination: {
        total: publishedModules.length,
        page,
        limit,
        totalPages: Math.ceil(publishedModules.length / limit),
        hasNext: end < publishedModules.length,
        hasPrev: page > 1
      }
    };
  }

  async findPublishedWithLessons(): Promise<Module[]> {
    return this.modules
      .filter(module => module.status === ModuleStatus.PUBLISHED)
      .sort((a, b) => a.order - b.order);
  }
} 