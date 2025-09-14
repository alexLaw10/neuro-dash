import { Observable } from "rxjs";
import { Agent } from "../entities/agent.entity";

export interface AgentRepository {
    findById(id: string): Observable<Agent | null>;
    findAll(): Observable<Agent[]>;
    delete(id: string): Observable<void>;
}