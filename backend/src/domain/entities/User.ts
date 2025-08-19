import { DomainEntity, UUID, Email, Timestamp } from '@shared/types/common';
import { UserEmail } from '@domain/value-objects/UserEmail';
import { UserPassword } from '@domain/value-objects/UserPassword';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export interface UserProps {
  id: UUID;
  email: UserEmail;
  password: UserPassword;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  lastLogin: Timestamp | undefined;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export class User implements DomainEntity {
  readonly id: UUID;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;

  private constructor(private readonly props: UserProps) {
    this.id = props.id;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  // Factory method para crear nuevo usuario
  public static create(
    id: UUID,
    email: UserEmail,
    password: UserPassword,
    firstName: string,
    lastName: string,
    role: UserRole = UserRole.USER
  ): User {
    const now = new Date();
    
    return new User({
      id,
      email,
      password,
      firstName,
      lastName,
      role,
      status: UserStatus.ACTIVE,
      emailVerified: false,
      lastLogin: undefined,
      createdAt: now,
      updatedAt: now,
    });
  }

  // Factory method para reconstituir desde persistencia
  public static fromPersistence(props: UserProps): User {
    return new User(props);
  }

  // Getters
  public get email(): UserEmail {
    return this.props.email;
  }

  public get firstName(): string {
    return this.props.firstName;
  }

  public get lastName(): string {
    return this.props.lastName;
  }

  public get fullName(): string {
    return `${this.props.firstName} ${this.props.lastName}`;
  }

  public get role(): UserRole {
    return this.props.role;
  }

  public get status(): UserStatus {
    return this.props.status;
  }

  public get emailVerified(): boolean {
    return this.props.emailVerified;
  }

  public get lastLogin(): Timestamp | undefined {
    return this.props.lastLogin;
  }

  // Métodos de negocio
  public isActive(): boolean {
    return this.props.status === UserStatus.ACTIVE;
  }

  public isAdmin(): boolean {
    return this.props.role === UserRole.ADMIN;
  }

  public verifyPassword(password: string): boolean {
    return this.props.password.verify(password);
  }

  public verifyEmail(): void {
    this.props.emailVerified = true;
    this.props.updatedAt = new Date();
  }

  public changePassword(newPassword: UserPassword): void {
    this.props.password = newPassword;
    this.props.updatedAt = new Date();
  }

  public updateProfile(firstName: string, lastName: string): void {
    this.props.firstName = firstName;
    this.props.lastName = lastName;
    this.props.updatedAt = new Date();
  }

  public suspend(): void {
    this.props.status = UserStatus.SUSPENDED;
    this.props.updatedAt = new Date();
  }

  public activate(): void {
    this.props.status = UserStatus.ACTIVE;
    this.props.updatedAt = new Date();
  }

  public recordLogin(): void {
    this.props.lastLogin = new Date();
    this.props.updatedAt = new Date();
  }

  // Serialización para persistencia
  public toPlainObject(): UserProps {
    return {
      id: this.id,
      email: this.props.email,
      password: this.props.password,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      role: this.props.role,
      status: this.props.status,
      emailVerified: this.props.emailVerified,
      lastLogin: this.props.lastLogin ?? undefined,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
} 