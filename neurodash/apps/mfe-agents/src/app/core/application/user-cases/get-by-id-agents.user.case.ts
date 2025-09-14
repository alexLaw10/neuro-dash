import { Inject, Injectable } from "@angular/core";
import { AgentRepository } from "../../domain/repositories/agent.repository.interface";
import { Agent } from "../../domain/entities/agent.entity";
import { Observable } from "rxjs";
import { AGENT_REPOSITORY_TOKEN } from '../../infrastructure/config/dependency-injection.config';

@Injectable()
  export class GetAgentByIdUseCase {
    constructor(@Inject(AGENT_REPOSITORY_TOKEN) private agentRepository: AgentRepository) {}
  
    public execute(id: string): Observable<Agent | null> {
      if (!id) {
        throw new Error('Post ID is required');
      }
  
      return this.agentRepository.findById(id);
    }
  }