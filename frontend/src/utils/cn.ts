import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utilidad para concatenar y mergear clases CSS con Tailwind
 * @param inputs - Clases CSS a concatenar
 * @returns String con clases CSS mergeadas
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 