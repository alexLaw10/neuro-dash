import { Injectable } from "@angular/core";
import { AgentsPort } from "../ports/agents.port";
import { Agent } from "../../domain/entities/agent.entity";
import { GetAllAgentsUseCase } from "../user-cases/get-all-agents.use-case";
import { Observable } from "rxjs";
import { GetAgentByIdUseCase } from "../user-cases/get-by-id-agents.user.case";
import { DeleteAgentUseCase } from "../user-cases/delete-agents.use-case";

// post.adapter.ts
@Injectable()
export class AgentsAdapter implements AgentsPort {
  constructor(
        private getAllAgentsUseCase: GetAllAgentsUseCase,
        private getAgentByIdUseCase: GetAgentByIdUseCase,       
        private deleteAgentUseCase: DeleteAgentUseCase,
        // ... outros use cases
  ) {}

  public getAllAgents(): Observable<Agent[]> {
    return this.getAllAgentsUseCase.execute();
  }

  public deleteAgent(id: string): Observable<void> {
    return this.deleteAgentUseCase.execute(id);
  }

  public getAgentById(id: string): Observable<Agent | null> {
    return this.getAgentByIdUseCase.execute(id);
  }
}