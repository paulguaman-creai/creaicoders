import { DomainEntity, UUID, Timestamp } from '@shared/types/common';
import { Evaluation } from './Evaluation';

export enum ModuleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export enum ModuleDifficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export interface ModuleProps {
  id: UUID;
  title: string;
  description: string;
  slug: string;
  difficulty: ModuleDifficulty;
  status: ModuleStatus;
  estimatedDuration: number; // en minutos
  estimatedMinutes: number; // alias para compatibilidad frontend
  order: number;
  tags: string[];
  iconUrl: string | undefined;
  coverImageUrl: string | undefined;
  prerequisites: UUID[]; // IDs de módulos prerequisito
  learningObjectives: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt: Timestamp | undefined;
  evaluations: Evaluation[];
}

export class Module {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly slug: string,
    public readonly difficulty: ModuleDifficulty,
    public readonly estimatedDuration: number,
    public readonly order: number,
    public readonly tags: string[],
    public readonly iconUrl: string,
    public readonly coverImageUrl: string,
    public readonly objectives: string[],
    public readonly prerequisites: string[],
    private _status: ModuleStatus = ModuleStatus.DRAFT,
    private _createdAt: string = new Date().toISOString(),
    private _updatedAt: string = new Date().toISOString(),
    private _publishedAt?: string,
    public readonly evaluations?: Evaluation[]
  ) {}

  get status(): ModuleStatus {
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
    this._status = ModuleStatus.PUBLISHED;
    this._publishedAt = new Date().toISOString();
    this._updatedAt = new Date().toISOString();
  }

  archive(): void {
    this._status = ModuleStatus.ARCHIVED;
    this._updatedAt = new Date().toISOString();
  }

  update(data: Partial<Module>): void {
    Object.assign(this, data);
    this._updatedAt = new Date().toISOString();
  }
} 