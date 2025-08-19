import { User, UserRole } from '@domain/entities/User';
import { UserEmail } from '@domain/value-objects/UserEmail';
import { UserPassword } from '@domain/value-objects/UserPassword';
import { UserRepository } from '@domain/repositories/UserRepository';
import { UUID, Result, success, failure } from '@shared/types/common';
import { CreateUserDto } from '@application/dtos/CreateUserDto';
import { logger } from '@infrastructure/config/logger';
import * as crypto from 'crypto';

export class UserAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`User with email ${email} already exists`);
    this.name = 'UserAlreadyExistsError';
  }
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: CreateUserDto): Promise<Result<User, Error>> {
    try {
      logger.info('Creating new user', { email: dto.email });

      // Validar y crear value objects
      const email = UserEmail.create(dto.email);
      const password = UserPassword.create(dto.password);

      // Verificar que el usuario no existe
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        logger.warn('User creation failed: user already exists', { email: dto.email });
        return failure(new UserAlreadyExistsError(dto.email));
      }

      // Generar ID único
      const id: UUID = crypto.randomUUID();

      // Crear entidad de dominio
      const user = User.create(
        id,
        email,
        password,
        dto.firstName,
        dto.lastName,
        dto.role || UserRole.USER
      );

      // Persistir usuario
      const savedUser = await this.userRepository.save(user);

      logger.info('User created successfully', { 
        id: savedUser.id, 
        email: savedUser.email.getValue() 
      });

      return success(savedUser);
    } catch (error) {
      logger.error('Error creating user', { error, dto });
      
      if (error instanceof Error) {
        return failure(error);
      }
      
      return failure(new Error('Unknown error occurred while creating user'));
    }
  }
} 