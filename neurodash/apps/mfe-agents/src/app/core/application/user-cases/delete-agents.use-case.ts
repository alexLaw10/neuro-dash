import { Inject, Injectable } from "@angular/core";
import { AgentRepository } from "../../domain/repositories/agent.repository.interface";
import { Observable } from "rxjs";
import { AGENT_REPOSITORY_TOKEN } from '../../infrastructure/config/dependency-injection.config';

@Injectable()
  export class DeleteAgentUseCase {
    constructor(@Inject(AGENT_REPOSITORY_TOKEN) private agentRepository: AgentRepository) {}    
  
    public execute(id: string): Observable<void> {
      if (!id) {
        throw new Error('Post ID is required');
      }
  
      // Deletar o post
      return this.agentRepository.delete(id);
    }
  }