import { User } from '@domain/entities/User';
import { UserEmail } from '@domain/value-objects/UserEmail';
import { UUID, PaginationParams, PaginatedResult } from '@shared/types/common';

export interface UserRepository {
  // Operaciones básicas CRUD
  findById(id: UUID): Promise<User | null>;
  findByEmail(email: UserEmail): Promise<User | null>;
  save(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: UUID): Promise<void>;
  
  // Consultas específicas
  findAll(params: PaginationParams): Promise<PaginatedResult<User>>;
  findActiveUsers(params: PaginationParams): Promise<PaginatedResult<User>>;
  findByRole(role: string, params: PaginationParams): Promise<PaginatedResult<User>>;
  
  // Verificaciones
  existsByEmail(email: UserEmail): Promise<boolean>;
  existsById(id: UUID): Promise<boolean>;
  
  // Operaciones en lote
  saveMany(users: User[]): Promise<User[]>;
  
  // Consultas de estadísticas
  count(): Promise<number>;
  countByStatus(status: string): Promise<number>;
} 