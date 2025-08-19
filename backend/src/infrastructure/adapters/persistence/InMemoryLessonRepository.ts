import { Lesson, LessonStatus, LessonType } from '@domain/entities/Lesson';
import { LessonRepository } from '@domain/repositories/LessonRepository';
import { PaginatedResult, PaginationParams } from '@shared/types/common';
import { ModuleDifficulty } from '@domain/entities/Module';

export class InMemoryLessonRepository implements LessonRepository {
  private lessons: Lesson[] = [];

  async save(lesson: Lesson): Promise<Lesson> {
    const existingIndex = this.lessons.findIndex(l => l.id === lesson.id);
    if (existingIndex >= 0) {
      this.lessons[existingIndex] = lesson;
    } else {
      this.lessons.push(lesson);
    }
    return lesson;
  }

  async findById(id: string): Promise<Lesson | null> {
    return this.lessons.find(lesson => lesson.id === id) ?? null;
  }

  async findBySlug(slug: string): Promise<Lesson | null> {
    return this.lessons.find(lesson => lesson.slug === slug) ?? null;
  }

  async findByModuleId(moduleId: string, params: PaginationParams): Promise<PaginatedResult<Lesson>> {
    const moduleLessons = this.lessons
      .filter(lesson => lesson.moduleId === moduleId)
      .sort((a, b) => a.order - b.order);

    const { page = 1, limit = 10 } = params;
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = moduleLessons.slice(start, end);

    return {
      data,
      pagination: {
        total: moduleLessons.length,
        page,
        limit,
        totalPages: Math.ceil(moduleLessons.length / limit),
        hasNext: end < moduleLessons.length,
        hasPrev: page > 1
      }
    };
  }

  async findPublished(params: PaginationParams): Promise<PaginatedResult<Lesson>> {
    const publishedLessons = this.lessons
      .filter(lesson => lesson.status === LessonStatus.PUBLISHED)
      .sort((a, b) => a.order - b.order);

    const { page = 1, limit = 10 } = params;
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = publishedLessons.slice(start, end);

    return {
      data,
      pagination: {
        total: publishedLessons.length,
        page,
        limit,
        totalPages: Math.ceil(publishedLessons.length / limit),
        hasNext: end < publishedLessons.length,
        hasPrev: page > 1
      }
    };
  }

  async findPublishedByModuleId(moduleId: string): Promise<Lesson[]> {
    return this.lessons
      .filter(lesson => lesson.moduleId === moduleId && lesson.status === LessonStatus.PUBLISHED)
      .sort((a, b) => a.order - b.order)
      .map(lesson => new Lesson(
        lesson.id,
        lesson.moduleId,
        lesson.title,
        lesson.description,
        lesson.slug,
        lesson.type as LessonType,
        lesson.order,
        lesson.estimatedDuration,
        lesson.tags,
        lesson.objectives,
        lesson.prerequisites,
        lesson.contentBlocks,
        ModuleDifficulty.INTERMEDIATE,
        lesson.iconUrl,
        lesson.status,
        lesson.createdAt,
        lesson.updatedAt,
        lesson.publishedAt
      ));
  }
} 