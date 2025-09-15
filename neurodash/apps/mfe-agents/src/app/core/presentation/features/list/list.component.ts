import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { AgentsService } from '../../../application/services/agents.service';
import { Agent } from '../../../domain/entities/agent.entity';
import { AgentStatus } from '../../../domain/enums/agent-status.enum';
import { CommunicationService } from '../../../application/services/communication.service';

@Component({
  selector: 'neurodash-agent-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy { 

  public agents: Agent[] = [];
  public agent: Agent | null = null;
  private messageSub?: Subscription;
  private originalAgents: Agent[] = []; // Mantém estado original do mock
  private lastUserMessageAtByAgent: Record<string, number> = {};
  private responseSumSecondsByAgent: Record<string, number> = {};
  private responseCountByAgent: Record<string, number> = {};

  constructor(
    private agentsService: AgentsService,
    private router: Router,
    private communicationService: CommunicationService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadAgents();
    this.setupMessageListener();
  }

  ngOnDestroy(): void {
    this.messageSub?.unsubscribe();
  }

  private setupMessageListener(): void {
    // Usa RxJS para ouvir eventos e facilitar unsubscribe
    this.messageSub = fromEvent<CustomEvent>(window, 'chat:messageSent').subscribe((event) => {
      const { agentId, status, lastActivity, sender, timestamp } = (event.detail || {}) as { agentId: string; status: AgentStatus | string; lastActivity: Date | string; sender?: 'user' | 'agent'; timestamp?: Date | string };
      if (!agentId) return;
      const parsedStatus = typeof status === 'string' ? (status as AgentStatus) : status;
      const parsedLastActivity = new Date(lastActivity);
      console.log(`🎨 Evento de chat recebido para agente ${agentId} | status: ${parsedStatus} | lastActivity: ${parsedLastActivity.toISOString()} | sender: ${sender} | timestamp: ${timestamp}`);
      this.ngZone.run(() => {
        this.updateAgentFromPayload(agentId, parsedStatus, parsedLastActivity);
        this.updateAverageResponseTime(agentId, sender, timestamp);
      });
    });
  }

  public loadAgents(): void {
    this.agentsService.getAllAgents().subscribe({
      next: (agents) => {
        this.originalAgents = [...agents]; // Salva estado original
        this.agents = [...agents]; // Cópia para manipulação visual
        
      }
    });
  }


  private updateAgentFromPayload(agentId: string, status: AgentStatus, lastActivity: Date): void {
    console.log(`🎨 Atualizando agente ${agentId} com status ${status} e lastActivity ${lastActivity.toISOString()}...`);
    this.agents = this.agents.map(agent => {
      if (agent.id === agentId) {
        return new Agent({
          id: agent.id,
          name: agent.name,
          type: agent.type,
          status,
          lastActivity,
          tasksCompleted: agent.tasksCompleted,
          successRate: agent.successRate,
          averageResponseTime: agent.averageResponseTime,
          config: agent.config,
          createdAt: agent.createdAt,
          updatedAt: new Date()
        });
      }
      return agent;
    });
  }

  private updateAverageResponseTime(agentId: string, sender?: 'user' | 'agent', timestamp?: Date | string): void {
    if (!sender || !timestamp) return;
    const eventTime = new Date(timestamp).getTime();
    if (Number.isNaN(eventTime)) return;
    if (sender === 'user') {
      this.lastUserMessageAtByAgent[agentId] = eventTime;
      return;
    }
    if (sender === 'agent') {
      const lastUserTs = this.lastUserMessageAtByAgent[agentId];
      if (!lastUserTs) return;
      const deltaMs = Math.max(0, eventTime - lastUserTs);
      const deltaSeconds = Math.round(deltaMs / 1000);
      // acumula soma e contagem por agente
      this.responseSumSecondsByAgent[agentId] = (this.responseSumSecondsByAgent[agentId] ?? 0) + deltaSeconds;
      this.responseCountByAgent[agentId] = (this.responseCountByAgent[agentId] ?? 0) + 1;
      const sum = this.responseSumSecondsByAgent[agentId];
      const count = this.responseCountByAgent[agentId];
      const updatedAvg = Math.round(sum / Math.max(1, count));
      this.agents = this.agents.map(a => {
        if (a.id !== agentId) return a;
        return new Agent({
          id: a.id,
          name: a.name,
          type: a.type,
          status: a.status,
          lastActivity: a.lastActivity,
          tasksCompleted: a.tasksCompleted,
          successRate: a.successRate,
          averageResponseTime: updatedAvg,
          config: a.config,
          createdAt: a.createdAt,
          updatedAt: new Date()
        });
      });
      // limpa o marcador após computar
      delete this.lastUserMessageAtByAgent[agentId];
    }
  }

  private getNextStatus(currentStatus: AgentStatus): AgentStatus {
    const statusOrder: AgentStatus[] = [
      AgentStatus.ONLINE, 
      AgentStatus.BUSY, 
      AgentStatus.OFFLINE, 
      AgentStatus.ERROR
    ];
    const currentIndex = statusOrder.indexOf(currentStatus);
    return statusOrder[(currentIndex + 1) % statusOrder.length];
  }

  public detailAgent(id: string): void {
    this.agentsService.getAgentById(id).subscribe({
      next: (agent) => this.agent = agent
    });
  }

  public deleteAgent(id: string): void {
    this.agentsService.deleteAgent(id).subscribe({
      next: () => this.loadAgents()
    });
  }

  public openChat(agentId: string): void {
    // Atualiza apenas o outlet "chat" dentro da rota workbench
    this.router.navigate([
      '/workbench',
      {
        outlets: {
          agents: ['agents'],
          chat: ['chat']
        }
      }
    ], { queryParams: { agentId } });
  }
}
