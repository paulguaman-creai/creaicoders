// Definir como const para evitar el error de erasableSyntaxOnly
export const ModuleStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

export type ModuleStatus = typeof ModuleStatus[keyof typeof ModuleStatus];

export const ModuleDifficulty = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
} as const;

export type ModuleDifficulty = typeof ModuleDifficulty[keyof typeof ModuleDifficulty];

export interface EvaluationTool {
  url: string;
  description: string;
}

export interface Evaluation {
  id: string;
  name: string;
  objective: string;
  instructions: string;
  schedule: string;
  evaluation: string;
  tools: EvaluationTool[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  slug: string;
  difficulty: ModuleDifficulty;
  status: ModuleStatus;
  estimatedDuration: number; // en minutos
  estimatedTime: number; // alias para compatibilidad frontend
  order: number;
  tags: string[];
  iconUrl?: string;
  coverImageUrl?: string;
  prerequisites: string[]; // IDs de módulos prerequisito
  learningObjectives: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  totalLessons: number;
  completedLessons: number;
  evaluations?: Evaluation[];
}

export interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'video' | 'code' | 'interactive';
  content: string;
  metadata?: Record<string, unknown>;
}

export const LessonStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

export type LessonStatus = typeof LessonStatus[keyof typeof LessonStatus];

export const LessonType = {
  CONCEPT: 'concept',
  EXAMPLE: 'example',
  EXERCISE: 'exercise',
  QUIZ: 'quiz',
} as const;

export type LessonType = typeof LessonType[keyof typeof LessonType];

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  slug: string;
  type: LessonType;
  status: LessonStatus;
  order: number;
  estimatedDuration: number; // en minutos
  estimatedTime: number; // alias para compatibilidad frontend
  difficulty: ModuleDifficulty;
  tags: string[];
  iconUrl?: string;
  objectives: string[];
  prerequisites: string[];
  contentBlocks: ContentBlock[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  points: number;
  isCompleted: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

export interface InteractiveContent {
  title: string;
  description: string;
  type: 'quiz' | 'ip-validation' | 'geolocation' | 'url-analysis';
  placeholder?: string;
  questions?: QuizQuestion[];
  note?: string;
}

export interface LearningProgress {
  moduleId: string;
  lessonId: string;
  completed: boolean;
  score?: number;
  completedAt?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  meta?: Record<string, unknown>;
} 