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

export interface AgentConfig {
  maxConcurrentTasks: number;
  timeout: number;
  retryAttempts: number;
  priority: 'low' | 'medium' | 'high';
}

export interface ChatMessage {
  id: string;
  agentId: string;
  message: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  isTyping?: boolean;
}

export interface AgentMetrics {
  agentId: string;
  requestsPerHour: number[];
  responseTimeHistory: number[];
  errorRate: number;
  uptime: number;
}

export interface CreateAgentRequest {
  name: string;
  type: 'conversational' | 'analytical' | 'task-executor';
  config: AgentConfig;
}

export interface UpdateAgentConfigRequest {
  config: AgentConfig;
}

export interface SendMessageRequest {
  message: string;
  agentId: string;
}
