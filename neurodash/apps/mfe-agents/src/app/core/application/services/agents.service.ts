import { Injectable, Inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AGENT_PORT_TOKEN } from '../../infrastructure/config/dependency-injection.config';
import { Agent } from '../../domain/entities/agent.entity';
import { AgentsPort } from '../ports/agents.port';

@Injectable()
export class AgentsService {
  constructor(@Inject(AGENT_PORT_TOKEN) private agentsPort: AgentsPort) {}  

  public getAgentById(id: string): Observable<Agent | null> {
    return this.agentsPort.getAgentById(id).pipe(
      map((agent: Agent | null) => agent ? this.agentToDto(agent) : null)
    );
  }
  
  public getAllAgents(): Observable<Agent[]> {
    return this.agentsPort.getAllAgents().pipe(
      map((agents: Agent[]) => agents.map(agent => this.agentToDto(agent)))
    );
  }
  
  public deleteAgent(id: string): Observable<void> {
    return this.agentsPort.deleteAgent(id);
  }

  private agentToDto(agent: Agent): Agent {
    return {  
      id: agent.id,
      createdAt: agent.createdAt,
      updatedAt: agent.updatedAt,
      equals: agent.equals,
      isOnline: agent.isOnline,
      isHighPerformance: agent.isHighPerformance,
      type: agent.type,
      status: agent.status,
      name: agent.name,
      lastActivity: agent.lastActivity,
      tasksCompleted: agent.tasksCompleted,
      successRate: agent.successRate,
      averageResponseTime: agent.averageResponseTime,
      config: agent.config,
    };
  }
}