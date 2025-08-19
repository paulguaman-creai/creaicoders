import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { container } from '@infrastructure/config/container';
import { TYPES } from '@infrastructure/config/types';
import { ModuleController } from '@infrastructure/adapters/web/controllers/ModuleController';
import { createModuleRoutes } from '@infrastructure/adapters/web/routes/moduleRoutes';
import { createLessonRoutes } from '@infrastructure/adapters/web/routes/lessonRoutes';
import { logger } from '@infrastructure/config/logger';

export async function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  // Controllers
  const moduleController = container.get<ModuleController>(TYPES.ModuleController);

  // Routes
  app.use('/api/modules', createModuleRoutes(moduleController));
  app.use('/api/lessons', createLessonRoutes());

  // Error handling
  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logger.error('Unhandled error:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  });

  return app;
}