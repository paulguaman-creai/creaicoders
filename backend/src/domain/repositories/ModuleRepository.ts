import { Module } from '@domain/entities/Module';
import { PaginatedResult, PaginationParams } from '@shared/types/common';

export interface ModuleRepository {
  save(module: Module): Promise<Module>;
  findById(id: string): Promise<Module | null>;
  findBySlug(slug: string): Promise<Module | null>;
  findAll(params: PaginationParams): Promise<PaginatedResult<Module>>;
  findPublished(params: PaginationParams): Promise<PaginatedResult<Module>>;
  findPublishedWithLessons(): Promise<Module[]>;
} 