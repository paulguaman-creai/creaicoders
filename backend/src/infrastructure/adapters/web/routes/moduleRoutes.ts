import { Router } from 'express';
import { ModuleController } from '@infrastructure/adapters/web/controllers/ModuleController';
import { container } from '@infrastructure/config/container';
import { Module } from '@domain/entities/Module';
import { PaginatedResult } from '@shared/types/common';
import { Lesson } from '@domain/entities/Lesson';
import { TYPES } from '@infrastructure/config/types';
import { ModuleRepository } from '@domain/repositories/ModuleRepository';
import { LessonRepository } from '@domain/repositories/LessonRepository';

export function createModuleRoutes(moduleController: ModuleController): Router {
  const router = Router();

  /**
   * @route   GET /api/modules/debug/all-lessons
   * @desc    Debug endpoint to see all lessons
   * @access  Public
   */
  router.get('/debug/all-lessons', async (req, res) => {
    try {
      const lessonRepo = container.get<LessonRepository>(TYPES.LessonRepository);
      const allLessons = await lessonRepo.findPublished({ page: 1, limit: 100 });
      res.json({
        success: true,
        data: allLessons.data,
        total: allLessons.pagination.total
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  /**
   * @route   GET /api/modules/debug/module-ids
   * @desc    Debug endpoint to see module IDs vs lesson module IDs
   * @access  Public
   */
  router.get('/debug/module-ids', async (req, res) => {
    try {
      const moduleRepo = container.get<ModuleRepository>(TYPES.ModuleRepository);
      const lessonRepo = container.get<LessonRepository>(TYPES.LessonRepository);
      
      const modules = await moduleRepo.findPublishedWithLessons();
      const lessons: PaginatedResult<Lesson> = await lessonRepo.findPublished({ page: 1, limit: 100 });
      
      res.json({
        success: true,
        modules: modules.map((m: Module) => ({ id: m.id, title: m.title })),
        lessons: lessons.data.map((l: Lesson) => ({ id: l.id, moduleId: l.moduleId, title: l.title }))
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  /**
   * @route   GET /api/modules
   * @desc    Get all published modules
   * @access  Public
   */
  router.get('/', (req, res) => moduleController.getAllModules(req, res));

  /**
   * @route   GET /api/modules/:slug
   * @desc    Get module by slug
   * @access  Public
   * @params  slug - Module slug (e.g., "como-funciona-internet")
   */
  router.get('/:slug', (req, res) => moduleController.getModuleBySlug(req, res));

  /**
   * @route   GET /api/modules/:moduleId/lessons
   * @desc    Get all lessons for a specific module
   * @access  Public
   * @params  moduleId - Module UUID
   */
  router.get('/:moduleId/lessons', (req, res) => moduleController.getModuleLessons(req, res));

  /**
   * @route   GET /api/modules/:moduleId/lessons/:lessonSlug
   * @desc    Get content for a specific lesson
   * @access  Public
   * @params  moduleId - Module UUID
   * @params  lessonSlug - Lesson slug (e.g., "fundamentos-de-internet")
   */
  router.get('/:moduleId/lessons/:lessonSlug', (req, res) => moduleController.getLessonContent(req, res));

  return router;
} 