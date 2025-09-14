import { Component, OnInit } from '@angular/core';
import { AgentsService } from '../../../application/services/agents.service';
import { Agent } from '../../../domain/entities/agent.entity';

@Component({
  selector: 'neurodash-agent-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit { 

  public agents: Agent[] = [];
  public agent: Agent | null = null;

  constructor(private agentsService: AgentsService) {}

  ngOnInit(): void {
    this.loadAgents();
  }

  public loadAgents(): void {
    this.agentsService.getAllAgents().subscribe({
      next: (agents) => this.agents = agents,
      error: (error) => console.error(error)
    });
  }
  public detailAgent(id: string): void {
    this.agentsService.getAgentById(id).subscribe({
      next: (agent) => this.agent = agent,
      error: (error) => console.error(error)
    });
  }

  public deleteAgent(id: string): void {
    this.agentsService.deleteAgent(id).subscribe({
      next: () => this.loadAgents(),
      error: (error) => console.error(error)
    });
  }
   
}
