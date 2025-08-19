import { inject, injectable } from 'inversify';
import { TYPES } from '@infrastructure/config/types';
import { ModuleRepository } from '@domain/repositories/ModuleRepository';
import { Module, ModuleStatus } from '@domain/entities/Module';
import { UseCase } from '@shared/types/common';
import { ModuleNotFoundError } from '@domain/errors/ModuleNotFoundError';
import { ModuleNotPublishedError } from '@domain/errors/ModuleNotPublishedError';

@injectable()
export class GetModuleBySlugUseCase implements UseCase<string, Module> {
  constructor(
    @inject(TYPES.ModuleRepository)
    private readonly moduleRepository: ModuleRepository
  ) {}

  async execute(slug: string): Promise<Module> {
    const module = await this.moduleRepository.findBySlug(slug);

    if (!module) {
      throw new ModuleNotFoundError(slug);
    }

    if (module.status !== ModuleStatus.PUBLISHED) {
      throw new ModuleNotPublishedError(slug);
    }

    return module;
  }
} 