import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AgentInfo } from '../../domain/entity/agent-info.entity';
import { AgentPort } from '../ports/agent.port';

@Injectable()
export class AgentAdapter implements AgentPort {
  private readonly baseUrl = 'http://localhost:3001/api/agents';

  constructor(private http: HttpClient) {}

  public getAgentById(id: string): Observable<AgentInfo | null> {
    return this.http.get<AgentInfo>(`${this.baseUrl}/${id}`);
  }
}
