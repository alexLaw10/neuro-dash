import { BaseEntity } from "./Base.entity";
import { AgentType } from "../enums/agent-type.enum";
import { AgentStatus } from "../enums/agent-status.enum";
import { Priority } from "../enums/priority.enum";


export interface AgentConfig {
    maxConcurrentTasks: number;
    timeout: number;
    retryAttempts: number;
    priority: Priority;
  }
  
export class Agent extends BaseEntity {
    public readonly name: string;
    public readonly lastActivity: Date;
    public readonly tasksCompleted: number;
    public readonly successRate: number;
    public readonly averageResponseTime: number;
    public readonly config: AgentConfig;    
    public readonly type: AgentType;      // ✅ Import do domain
    public readonly status: AgentStatus
  
    constructor(data: {
      id: string;
      name: string;
      type: AgentType;
      status: AgentStatus;
      lastActivity: Date;
      tasksCompleted: number;
      successRate: number;
      averageResponseTime: number;
      config: AgentConfig;
      createdAt?: Date;
      updatedAt?: Date;
    }) {
      super();
      this.name = data.name;
      this.type = data.type;
      this.status = data.status;
      this.lastActivity = data.lastActivity;
      this.tasksCompleted = data.tasksCompleted;
      this.successRate = data.successRate;
      this.averageResponseTime = data.averageResponseTime;
      this.config = data.config;
    }
  
    public equals(entity: BaseEntity): boolean {
      return this.id === entity.id;
    }
  
    // Métodos de negócio simples se necessário
    public isOnline(): boolean {
      return this.status === 'online';
    }
  
    public isHighPerformance(): boolean {
      return this.successRate >= 90 && this.averageResponseTime <= 2;
    }
  }