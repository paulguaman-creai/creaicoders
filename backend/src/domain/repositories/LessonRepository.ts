import { Lesson } from '@domain/entities/Lesson';
import { PaginatedResult, PaginationParams } from '@shared/types/common';

export interface LessonRepository {
  save(lesson: Lesson): Promise<Lesson>;
  findById(id: string): Promise<Lesson | null>;
  findBySlug(slug: string): Promise<Lesson | null>;
  findByModuleId(moduleId: string, params: PaginationParams): Promise<PaginatedResult<Lesson>>;
  findPublished(params: PaginationParams): Promise<PaginatedResult<Lesson>>;
  findPublishedByModuleId(moduleId: string): Promise<Lesson[]>;
} 