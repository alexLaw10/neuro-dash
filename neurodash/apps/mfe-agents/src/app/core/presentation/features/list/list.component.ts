import { Component, OnInit } from '@angular/core';
import { AgentsService } from '../../../application/services/agents.service';
import { Agent } from '../../../domain/entities/agent.entity';

@Component({
  selector: 'neurodash-agent-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit { 

  public agents: Agent[] = [];

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
}
