import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Agent } from '../../domain/entities/agent.entity';
import { AgentRepository } from '../../domain/repositories/agent.repository.interface';
import { AGENT_REPOSITORY_TOKEN } from '../../infrastructure/config/dependency-injection.config';

@Injectable()
export class GetAllAgentsUseCase {
  constructor(@Inject(AGENT_REPOSITORY_TOKEN) private agentRepository: AgentRepository) {}

  public execute(): Observable<Agent[]> {
    return this.agentRepository.findAll();
  }
}