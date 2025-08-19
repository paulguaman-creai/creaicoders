export const TYPES = {
  // Repositorios
  ModuleRepository: Symbol.for('ModuleRepository'),
  LessonRepository: Symbol.for('LessonRepository'),

  // Casos de uso
  GetAllModulesUseCase: Symbol.for('GetAllModulesUseCase'),
  GetModuleBySlugUseCase: Symbol.for('GetModuleBySlugUseCase'),
  GetModuleLessonsUseCase: Symbol.for('GetModuleLessonsUseCase'),

  // Controladores
  ModuleController: Symbol.for('ModuleController'),
}; 