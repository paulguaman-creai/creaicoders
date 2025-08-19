import { ValueObject } from '@shared/types/common';
import { z } from 'zod';
import * as crypto from 'crypto';

interface UserPasswordProps {
  hashedValue: string;
  salt: string;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  private constructor(props: UserPasswordProps) {
    super(props);
  }

  public static create(password: string): UserPassword {
    // Validar contraseña
    const passwordSchema = z.string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
        'Password must contain at least one lowercase, one uppercase, and one number');
    
    const result = passwordSchema.safeParse(password);
    
    if (!result.success) {
      throw new Error(`Invalid password: ${result.error.issues[0]?.message}`);
    }

    // Generar salt y hash
    const salt = crypto.randomBytes(32).toString('hex');
    const hashedValue = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return new UserPassword({ hashedValue, salt });
  }

  public static fromHash(hashedValue: string, salt: string): UserPassword {
    return new UserPassword({ hashedValue, salt });
  }

  public verify(password: string): boolean {
    const hash = crypto.pbkdf2Sync(password, this._value.salt, 10000, 64, 'sha512').toString('hex');
    return hash === this._value.hashedValue;
  }

  public getHashedValue(): string {
    return this._value.hashedValue;
  }

  public getSalt(): string {
    return this._value.salt;
  }
} 