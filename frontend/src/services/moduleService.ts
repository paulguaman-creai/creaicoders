import type { Module, Lesson } from '../types/education';

// Usando rutas relativas ya que tenemos el proxy configurado
const API_BASE_URL = '/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export class ModuleService {
  /**
   * Obtiene todos los módulos disponibles
   */
  async getAllModules(): Promise<Module[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/modules`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse<Module[]> = await response.json();
      
      if (!data.success || !data.data) {
        throw new Error(data.message || 'Error al obtener módulos');
      }
      
      return data.data;
    } catch (error) {
      console.error('Error fetching modules:', error);
      throw error;
    }
  }

  /**
   * Obtiene un módulo específico por su slug
   */
  async getModuleBySlug(slug: string): Promise<Module> {
    try {
      const response = await fetch(`${API_BASE_URL}/modules/${slug}`);
      console.log('Fetching module by slug:', `${API_BASE_URL}/modules/${slug}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse<Module> = await response.json();
      console.log('Module data:', data);
      
      if (!data.success || !data.data) {
        throw new Error(data.message || 'Módulo no encontrado');
      }
      
      return data.data;
    } catch (error) {
      console.error('Error fetching module:', error);
      throw error;
    }
  }

  /**
   * Obtiene todas las lecciones de un módulo
   */
  async getModuleLessons(moduleId: string): Promise<Lesson[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/modules/${moduleId}/lessons`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse<Lesson[]> = await response.json();
      
      if (!data.success || !data.data) {
        throw new Error(data.message || 'Error al obtener lecciones');
      }
      
      return data.data;
    } catch (error) {
      console.error('Error fetching lessons:', error);
      throw error;
    }
  }

  /**
   * Verifica si el backend está disponible
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
      return response.ok;
    } catch (error) {
      console.error('Backend health check failed:', error);
      return false;
    }
  }
}

// Exportar una instancia del servicio
export const moduleService = new ModuleService(); 