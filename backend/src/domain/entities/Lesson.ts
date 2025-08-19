import { ModuleDifficulty } from './Module';

export enum LessonType {
  CONCEPT = 'concept',
  EXAMPLE = 'example',
  EXERCISE = 'exercise',
  QUIZ = 'quiz',
}

export enum LessonStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export class Lesson {
  constructor(
    public readonly id: string,
    public readonly moduleId: string,
    public readonly title: string,
    public readonly description: string,
    public readonly slug: string,
    public readonly type: LessonType,
    public readonly order: number,
    public readonly estimatedDuration: number,
    public readonly tags: string[],
    public readonly objectives: string[],
    public readonly prerequisites: string[],
    public readonly contentBlocks: any[],
    public readonly difficulty: ModuleDifficulty,
    public readonly iconUrl: string | undefined,
    private _status: LessonStatus,
    private _createdAt: string,
    private _updatedAt: string,
    private _publishedAt: string | undefined,
  ) {}

  get status(): LessonStatus {
    return this._status;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  get updatedAt(): string {
    return this._updatedAt;
  }

  get publishedAt(): string | undefined {
    return this._publishedAt;
  }

  publish(): void {
    this._status = LessonStatus.PUBLISHED;
    this._publishedAt = new Date().toISOString();
    this._updatedAt = new Date().toISOString();
  }

  archive(): void {
    this._status = LessonStatus.ARCHIVED;
    this._updatedAt = new Date().toISOString();
  }

  update(data: Partial<Lesson>): void {
    Object.assign(this, data);
    this._updatedAt = new Date().toISOString();
  }
} 