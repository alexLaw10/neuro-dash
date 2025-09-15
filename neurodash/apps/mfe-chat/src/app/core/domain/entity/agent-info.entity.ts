import { AgentStatus } from '../enums/agent-status.enum';

export interface AgentInfo {
  id: string;
  name: string;
  status: AgentStatus;
  lastActivity: Date;
}
