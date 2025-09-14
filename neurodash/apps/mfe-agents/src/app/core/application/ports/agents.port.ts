import { Observable } from "rxjs";
import { Agent } from "../../domain/entities/agent.entity";

export interface AgentsPort {
    getAllAgents(): Observable<Agent[]>;
    getAgentById(id: string): Observable<Agent | null>;
    deleteAgent(id: string): Observable<void>;
}