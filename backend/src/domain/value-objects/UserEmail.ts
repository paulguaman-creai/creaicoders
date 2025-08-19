import { ValueObject } from '@shared/types/common';
import { z } from 'zod';

interface UserEmailProps {
  value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  private constructor(props: UserEmailProps) {
    super(props);
  }

  public static create(email: string): UserEmail {
    const emailSchema = z.string().email('Invalid email format');
    
    const result = emailSchema.safeParse(email.toLowerCase().trim());
    
    if (!result.success) {
      throw new Error(`Invalid email: ${result.error.issues[0]?.message}`);
    }

    return new UserEmail({ value: result.data });
  }

  public getValue(): string {
    return this._value.value;
  }

  public getDomain(): string {
    return this._value.value.split('@')[1] || '';
  }

  public getLocalPart(): string {
    return this._value.value.split('@')[0] || '';
  }

  public toString(): string {
    return this._value.value;
  }
} 