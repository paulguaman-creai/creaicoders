import { Router } from 'express';
import { container } from '@infrastructure/config/container';
import { TYPES } from '@infrastructure/config/types';
import { LessonRepository } from '@domain/repositories/LessonRepository';

export function createLessonRoutes(): Router {
  const router = Router();

  /**
   * @route   GET /api/lessons/debug/all
   * @desc    Debug endpoint to see all lessons
   * @access  Public
   */
  router.get('/debug/all', async (req, res) => {
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

  return router;
} 