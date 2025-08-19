import type { Evaluation } from "@/types/education";

// Interfaces para la API educativa
export interface Module {
  id: string;
  title: string;
  description: string;
  slug: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  order: number;
  tags: string[];
  iconUrl?: string;
  coverImageUrl?: string;
  learningObjectives: string[];
  prerequisites: string[];
  totalLessons: number;
  completedLessons: number;
  createdAt: string;
  publishedAt?: string;
  evaluations: Evaluation[];
}

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  moduleId: string;
  order: number;
  estimatedTime: string;
  difficulty: string;
  isCompleted: boolean;
  points: number;
}

export interface ContentBlock {
  type: 'text' | 'interactive' | 'quiz' | 'external-quiz';
  content?: string;
  widgetType?: string;
  metadata?: {
    title?: string;
    description?: string;
    placeholder?: string;
    note?: string;
    url?: string; // Para quizzes externos
    // Para quiz
    questions?: Array<{
      id: string;
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
      points: number;
    }>;
    // Para ejercicios de código
    exercise?: {
      id: string;
      title: string;
      description: string;
      startingCode: string;
      expectedOutput: string;
      testCases: Array<{
        input: string;
        expected: string;
        description: string;
      }>;
      hints: string[];
      points: number;
    };
  };
}

export interface LessonContent {
  id: string;
  title: string;
  description: string;
  contentBlocks: ContentBlock[];
}

// Configuración de la API - Usando rutas relativas ya que tenemos el proxy configurado
const API_BASE_URL = '/api';

// Función de ayuda para manejar errores
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error en la petición');
  }
  return response.json();
};

// Funciones de la API
export const getAllModules = async (): Promise<Module[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/modules`);
    const data = await handleResponse(response);
    
    if (data?.success && Array.isArray(data.data)) {
      return data.data;
    }
    
    throw new Error('Formato de respuesta inválido');
  } catch (error) {
    console.error('Error al obtener módulos:', error);
    throw error;
  }
};

export const getModuleBySlug = async (slug: string): Promise<Module> => {
  try {
    const response = await fetch(`${API_BASE_URL}/modules/${slug}`);
    const data = await handleResponse(response);
    return data.data;
  } catch (error) {
    console.error('Error fetching module:', error);
    throw error;
  }
};


export const getModuleLessons = async (moduleId: string): Promise<Lesson[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/modules/${moduleId}/lessons`);
    const data = await handleResponse(response);
    return data.data || [];
  } catch (error) {
    console.error('Error fetching module lessons:', error);
    throw error;
  }
};

export const getLessonContent = async (moduleId: string, lessonSlug: string): Promise<LessonContent> => {
  try {
    const response = await fetch(`${API_BASE_URL}/modules/${moduleId}/lessons/${lessonSlug}`);
    const data = await handleResponse(response);
    return data.data;
  } catch (error) {
    console.error('Error fetching lesson content:', error);
    throw error;
  }
};

export const completeLeson = async (lessonId: string, score: number, totalPoints: number): Promise<{ success: boolean; message: string; score: number; totalPoints: number }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ score, totalPoints }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error completing lesson:', error);
    throw error;
  }
}; 

// Funciones para APIs externas
export const getPublicIP = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/network/public-ip`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error getting public IP:', error);
    throw error;
  }
};

export const analyzeURL = async (url: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/network/analyze-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error analyzing URL:', error);
    throw error;
  }
};

export const getIPExercise = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/network/ip-exercise`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error getting IP exercise:', error);
    throw error;
  }
};

export const getDNSExercise = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/network/dns-exercise`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error getting DNS exercise:', error);
    throw error;
  }
};

export const getInternetStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/network/internet-stats`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error getting Internet stats:', error);
    throw error;
  }
}; 