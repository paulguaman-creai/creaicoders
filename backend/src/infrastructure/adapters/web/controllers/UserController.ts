import { Request, Response } from 'express';
import { CreateUserUseCase, UserAlreadyExistsError } from '@application/use-cases/CreateUserUseCase';
import { safeValidateCreateUserDto } from '@application/dtos/CreateUserDto';
import { HttpStatus, ApiResponse } from '@shared/types/common';
import { logger } from '@infrastructure/config/logger';

export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async createUser(req: Request, res: Response): Promise<Response<ApiResponse>> {
    try {
      // Validar datos de entrada
      const validation = safeValidateCreateUserDto(req.body);
      
      if (!validation.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Validation failed',
          errors: validation.errors,
        });
      }

      // Ejecutar caso de uso
      const result = await this.createUserUseCase.execute(validation.data!);

      if (!result.success) {
        if (result.error instanceof UserAlreadyExistsError) {
          return res.status(HttpStatus.CONFLICT).json({
            success: false,
            message: result.error.message,
          });
        }

        logger.error('User creation failed', { error: result.error });
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: 'Internal server error',
        });
      }

      // Respuesta exitosa (sin incluir datos sensibles)
      const user = result.data!;
      return res.status(HttpStatus.CREATED).json({
        success: true,
        data: {
          id: user.id,
          email: user.email.getValue(),
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          status: user.status,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt,
        },
        message: 'User created successfully',
      });
    } catch (error) {
      logger.error('Unexpected error in createUser controller', { error });
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async getUser(req: Request, res: Response): Promise<Response<ApiResponse>> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'User ID is required',
        });
      }

      // TODO: Implementar GetUserUseCase
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'User not found',
      });
    } catch (error) {
      logger.error('Unexpected error in getUser controller', { error });
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async listUsers(req: Request, res: Response): Promise<Response<ApiResponse>> {
    try {
      // TODO: Implementar ListUsersUseCase con paginación
      return res.status(HttpStatus.OK).json({
        success: true,
        data: [],
        message: 'Users retrieved successfully',
      });
    } catch (error) {
      logger.error('Unexpected error in listUsers controller', { error });
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
} 