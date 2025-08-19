import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from '@infrastructure/config/types';

// Repositorios
import { ModuleRepository } from '@domain/repositories/ModuleRepository';
import { LessonRepository } from '@domain/repositories/LessonRepository';
import { InMemoryModuleRepository } from '@infrastructure/adapters/persistence/InMemoryModuleRepository';
import { InMemoryLessonRepository } from '@infrastructure/adapters/persistence/InMemoryLessonRepository';

// Casos de uso
import { GetAllModulesUseCase } from '@application/use-cases/GetAllModulesUseCase';
import { GetModuleBySlugUseCase } from '@application/use-cases/GetModuleBySlugUseCase';
import { GetModuleLessonsUseCase } from '@application/use-cases/GetModuleLessonsUseCase';

// Controladores
import { ModuleController } from '@infrastructure/adapters/web/controllers/ModuleController';

const container = new Container();

// Repositorios
container.bind<ModuleRepository>(TYPES.ModuleRepository).to(InMemoryModuleRepository).inSingletonScope();
container.bind<LessonRepository>(TYPES.LessonRepository).to(InMemoryLessonRepository).inSingletonScope();

// Casos de uso
container.bind<GetAllModulesUseCase>(TYPES.GetAllModulesUseCase).to(GetAllModulesUseCase);
container.bind<GetModuleBySlugUseCase>(TYPES.GetModuleBySlugUseCase).to(GetModuleBySlugUseCase);
container.bind<GetModuleLessonsUseCase>(TYPES.GetModuleLessonsUseCase).to(GetModuleLessonsUseCase);

// Controladores
container.bind<ModuleController>(TYPES.ModuleController).to(ModuleController);

export { container }; 