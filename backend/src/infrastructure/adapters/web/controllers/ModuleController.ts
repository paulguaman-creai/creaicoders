import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { TYPES } from '@infrastructure/config/types';
import { GetAllModulesUseCase } from '@application/use-cases/GetAllModulesUseCase';
import { GetModuleBySlugUseCase } from '@application/use-cases/GetModuleBySlugUseCase';
import { GetModuleLessonsUseCase } from '@application/use-cases/GetModuleLessonsUseCase';
import { ModuleNotFoundError } from '@domain/errors/ModuleNotFoundError';
import { ModuleNotPublishedError } from '@domain/errors/ModuleNotPublishedError';
import { logger } from '@infrastructure/config/logger';
import { HttpStatus } from '@shared/types/common';

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}

@injectable()
export class ModuleController {
  constructor(
    @inject(TYPES.GetAllModulesUseCase)
    private readonly getAllModulesUseCase: GetAllModulesUseCase,
    @inject(TYPES.GetModuleBySlugUseCase)
    private readonly getModuleBySlugUseCase: GetModuleBySlugUseCase,
    @inject(TYPES.GetModuleLessonsUseCase)
    private readonly getModuleLessonsUseCase: GetModuleLessonsUseCase
  ) {}

  async getAllModules(_req: Request, res: Response): Promise<Response<ApiResponse>> {
    try {
      logger.info('GET /api/modules - Getting all modules');

      const modules = await this.getAllModulesUseCase.execute();

      const response = modules.map(module => ({
        id: module.id,
        title: module.title,
        description: module.description,
        slug: module.slug,
        difficulty: module.difficulty,
        estimatedDuration: module.estimatedDuration,
        order: module.order,
        tags: module.tags,
        iconUrl: module.iconUrl,
        coverImageUrl: module.coverImageUrl,
        objectives: module.objectives,
        prerequisites: module.prerequisites,
        status: module.status,
        createdAt: module.createdAt,
        updatedAt: module.updatedAt,
        publishedAt: module.publishedAt,
        evaluations: module.evaluations
      }));

      return res.status(HttpStatus.OK).json({
        success: true,
        data: response
      });
    } catch (error) {
      logger.error('Error getting modules:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error getting modules'
      });
    }
  }

  async getModuleBySlug(req: Request, res: Response): Promise<Response<ApiResponse>> {
    try {
      const { slug } = req.params;
      logger.info('GET /api/modules/:slug - Getting module by slug', { slug });

      if (!slug) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Module slug is required'
        });
      }

      try {
        const module = await this.getModuleBySlugUseCase.execute(slug);

        const response = {
          id: module.id,
          title: module.title,
          description: module.description,
          slug: module.slug,
          difficulty: module.difficulty,
          estimatedDuration: module.estimatedDuration,
          order: module.order,
          tags: module.tags,
          iconUrl: module.iconUrl,
          coverImageUrl: module.coverImageUrl,
          objectives: module.objectives,
          prerequisites: module.prerequisites,
          status: module.status,
          createdAt: module.createdAt,
          updatedAt: module.updatedAt,
          publishedAt: module.publishedAt,
          evaluations: module.evaluations
        };

        return res.status(HttpStatus.OK).json({
          success: true,
          data: response
        });
      } catch (error) {
        if (error instanceof ModuleNotFoundError) {
          return res.status(HttpStatus.NOT_FOUND).json({
            success: false,
            message: error.message
          });
        }

        if (error instanceof ModuleNotPublishedError) {
          return res.status(HttpStatus.NOT_FOUND).json({
            success: false,
            message: error.message
          });
        }

        throw error;
      }
    } catch (error) {
      logger.error('Error getting module:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error getting module'
      });
    }
  }

  async getModuleLessons(req: Request, res: Response): Promise<Response<ApiResponse>> {
    try {
      const { moduleId } = req.params;
      logger.info('GET /api/modules/:moduleId/lessons - Getting module lessons', { moduleId });

      if (!moduleId) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Module ID is required'
        });
      }

      try {
        const lessons = await this.getModuleLessonsUseCase.execute(moduleId);

        const response = lessons.map(lesson => ({
          id: lesson.id,
          moduleId: lesson.moduleId,
          title: lesson.title,
          description: lesson.description,
          slug: lesson.slug,
          type: lesson.type,
          order: lesson.order,
          estimatedDuration: lesson.estimatedDuration,
          tags: lesson.tags,
          iconUrl: lesson.iconUrl,
          objectives: lesson.objectives,
          prerequisites: lesson.prerequisites,
          contentBlocks: lesson.contentBlocks,
          difficulty: lesson.difficulty,
          status: lesson.status,
          createdAt: lesson.createdAt,
          updatedAt: lesson.updatedAt,
          publishedAt: lesson.publishedAt
        }));

        return res.status(HttpStatus.OK).json({
          success: true,
          data: response
        });
      } catch (error) {
        if (error instanceof ModuleNotFoundError) {
          return res.status(HttpStatus.NOT_FOUND).json({
            success: false,
            message: error.message
          });
        }

        if (error instanceof ModuleNotPublishedError) {
          return res.status(HttpStatus.NOT_FOUND).json({
            success: false,
            message: error.message
          });
        }

        throw error;
      }
    } catch (error) {
      logger.error('Error getting module lessons:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error getting module lessons'
      });
    }
  }

  async getLessonContent(req: Request, res: Response): Promise<Response<ApiResponse>> {
    try {
      const { moduleId, lessonSlug } = req.params;
      logger.info('GET /api/modules/:moduleId/lessons/:lessonSlug - Getting lesson content', { moduleId, lessonSlug });

      if (!moduleId || !lessonSlug) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Module ID and lesson slug are required'
        });
      }

      try {
        const lessons = await this.getModuleLessonsUseCase.execute(moduleId);
        const lesson = lessons.find(l => l.slug === lessonSlug);

        if (!lesson) {
          return res.status(HttpStatus.NOT_FOUND).json({
            success: false,
            message: `Lesson with slug '${lessonSlug}' not found in module '${moduleId}'`
          });
        }

        const response = {
          id: lesson.id,
          moduleId: lesson.moduleId,
          title: lesson.title,
          description: lesson.description,
          slug: lesson.slug,
          type: lesson.type,
          order: lesson.order,
          estimatedDuration: lesson.estimatedDuration,
          tags: lesson.tags,
          iconUrl: lesson.iconUrl,
          objectives: lesson.objectives,
          prerequisites: lesson.prerequisites,
          contentBlocks: lesson.contentBlocks,
          difficulty: lesson.difficulty,
          status: lesson.status,
          createdAt: lesson.createdAt,
          updatedAt: lesson.updatedAt,
          publishedAt: lesson.publishedAt
        };

        return res.status(HttpStatus.OK).json({
          success: true,
          data: response
        });
      } catch (error) {
        if (error instanceof ModuleNotFoundError) {
          return res.status(HttpStatus.NOT_FOUND).json({
            success: false,
            message: error.message
          });
        }

        if (error instanceof ModuleNotPublishedError) {
          return res.status(HttpStatus.NOT_FOUND).json({
            success: false,
            message: error.message
          });
        }

        throw error;
      }
    } catch (error) {
      logger.error('Error getting lesson content:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error getting lesson content'
      });
    }
  }
} 