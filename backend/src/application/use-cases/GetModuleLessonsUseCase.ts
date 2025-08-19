import { inject, injectable } from 'inversify';
import { TYPES } from '@infrastructure/config/types';
import { ModuleRepository } from '@domain/repositories/ModuleRepository';
import { LessonRepository } from '@domain/repositories/LessonRepository';
import { Module, ModuleStatus } from '@domain/entities/Module';
import { Lesson } from '@domain/entities/Lesson';
import { UseCase } from '@shared/types/common';
import { ModuleNotFoundError } from '@domain/errors/ModuleNotFoundError';
import { ModuleNotPublishedError } from '@domain/errors/ModuleNotPublishedError';

@injectable()
export class GetModuleLessonsUseCase implements UseCase<string, Lesson[]> {
  constructor(
    @inject(TYPES.ModuleRepository)
    private readonly moduleRepository: ModuleRepository,
    @inject(TYPES.LessonRepository)
    private readonly lessonRepository: LessonRepository
  ) {}

  async execute(moduleId: string): Promise<Lesson[]> {
    const module = await this.moduleRepository.findById(moduleId);

    if (!module) {
      throw new ModuleNotFoundError(moduleId);
    }

    if (module.status !== ModuleStatus.PUBLISHED) {
      throw new ModuleNotPublishedError(moduleId);
    }

    return this.lessonRepository.findPublishedByModuleId(moduleId);
  }
} 