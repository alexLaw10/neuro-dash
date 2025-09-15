import { Observable } from 'rxjs';
import { AgentInfo } from '../../domain/entity/agent-info.entity';

export interface AgentPort {
  getAgentById(id: string): Observable<AgentInfo | null>;
}
