export interface AgentConfig {
  maxConcurrentTasks: number;
  timeout: number;
  retryAttempts: number;
  priority: 'low' | 'medium' | 'high';
}

export interface Agent {
  id: string;
  name: string;
  type: 'conversational' | 'analytical' | 'task-executor';
  status: 'online' | 'offline' | 'busy' | 'error';
  lastActivity: Date;
  tasksCompleted: number;
  successRate: number;
  averageResponseTime: number;
  config: AgentConfig;
}
