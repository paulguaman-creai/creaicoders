import { z } from 'zod';
import { UserRole } from '@domain/entities/User';

// Schema de validación para CreateUserDto
export const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
      'Password must contain at least one lowercase, one uppercase, and one number'),
  firstName: z.string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'First name can only contain letters and spaces'),
  lastName: z.string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Last name can only contain letters and spaces'),
  role: z.nativeEnum(UserRole).optional(),
});

// Tipo inferido del schema
export type CreateUserDto = z.infer<typeof createUserSchema>;

// Función helper para validar
export function validateCreateUserDto(data: unknown): CreateUserDto {
  return createUserSchema.parse(data);
}

// Función helper para validación segura
export function safeValidateCreateUserDto(data: unknown): {
  success: boolean;
  data?: CreateUserDto;
  errors?: string[];
} {
  const result = createUserSchema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { 
      success: false, 
      errors: result.error.issues.map(issue => issue.message) 
    };
  }
} 