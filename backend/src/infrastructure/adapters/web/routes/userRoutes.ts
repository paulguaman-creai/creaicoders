import { Router } from 'express';
import { UserController } from '@infrastructure/adapters/web/controllers/UserController';

export function createUserRoutes(userController: UserController): Router {
  const router = Router();

  /**
   * @route   POST /api/users
   * @desc    Create a new user
   * @access  Public
   * @body    { email, password, firstName, lastName, role? }
   */
  router.post('/', (req, res) => userController.createUser(req, res));

  /**
   * @route   GET /api/users/:id
   * @desc    Get user by ID
   * @access  Private
   * @params  id - User UUID
   */
  router.get('/:id', (req, res) => userController.getUser(req, res));

  /**
   * @route   GET /api/users
   * @desc    List all users with pagination
   * @access  Private (Admin only)
   * @query   page?, limit?, sortBy?, sortOrder?
   */
  router.get('/', (req, res) => userController.listUsers(req, res));

  return router;
} 