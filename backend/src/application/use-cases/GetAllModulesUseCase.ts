import { inject, injectable } from 'inversify';
import { TYPES } from '@infrastructure/config/types';
import { ModuleRepository } from '@domain/repositories/ModuleRepository';
import { Module } from '@domain/entities/Module';
import { UseCase } from '@shared/types/common';

@injectable()
export class GetAllModulesUseCase implements UseCase<void, Module[]> {
  constructor(
    @inject(TYPES.ModuleRepository)
    private readonly moduleRepository: ModuleRepository
  ) {}

  async execute(): Promise<Module[]> {
    const modules = await this.moduleRepository.findPublishedWithLessons();
    return modules;
  }
} 