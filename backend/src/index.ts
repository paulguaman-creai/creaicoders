import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import process from 'process';
import { container } from '@infrastructure/config/container';
import { TYPES } from '@infrastructure/config/types';
import { ModuleController } from '@infrastructure/adapters/web/controllers/ModuleController';
import { createModuleRoutes } from '@infrastructure/adapters/web/routes/moduleRoutes';
import { createLessonRoutes } from '@infrastructure/adapters/web/routes/lessonRoutes';
import { errorHandler } from '@infrastructure/adapters/web/middleware/errorHandler';
import { logger } from '@infrastructure/config/logger';
import { ModuleRepository } from '@domain/repositories/ModuleRepository';
import { LessonRepository } from '@domain/repositories/LessonRepository';
import { InternetModule, InternetLessons } from '@infrastructure/data/InternetModuleContent';

async function initializeData() {
  try {
    const moduleRepo = container.get<ModuleRepository>(TYPES.ModuleRepository);
    const lessonRepo = container.get<LessonRepository>(TYPES.LessonRepository);

    // Guardar módulo inicial
    await moduleRepo.save(InternetModule);
    logger.info('✅ Módulo inicial guardado correctamente');

    // Guardar lecciones iniciales
    await Promise.all(InternetLessons.map(lesson => lessonRepo.save(lesson)));
    logger.info('✅ Lecciones iniciales guardadas correctamente');
  } catch (error) {
    logger.error('❌ Error inicializando datos:', error);
    throw error; // Re-throw para manejo superior
  }
}

async function startServer() {
  try {
    // Primero inicializar datos
    await initializeData();
    logger.info('✅ Datos inicializados correctamente');

    const app = express();
    const port = process.env.PORT ?? 3000;

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Rutas
    const moduleController = container.get<ModuleController>(TYPES.ModuleController);
    app.use('/api/modules', createModuleRoutes(moduleController));
    app.use('/api/lessons', createLessonRoutes());

    // Middleware de errores
    app.use(errorHandler);

    // Iniciar servidor
    app.listen(port, () => {
      logger.info(`✅ Server running at http://localhost:${port}`);
    });
  } catch (error) {
    logger.error('❌ Error starting server:', error);
    throw error;
  }
}

// Iniciar el servidor
startServer().catch(error => {
  logger.error('❌ Fatal error:', error);
  process.exit(1);
});