import { Injectable, Inject } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap, map, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { AgentInfo } from '../../domain/entity/agent-info.entity';
import { AgentPort } from '../ports/agent.port';
import { AGENT_PORT_TOKEN } from '../../infrastructure/config/dependecy-injection.config';
import { AgentStatus } from '../../domain/enums/agent-status.enum';

const INTERVAL_MS = 5000;

@Injectable()
export class AgentService {
  constructor(@Inject(AGENT_PORT_TOKEN) private agentPort: AgentPort) {}

  public getAgentById(id: string): Observable<AgentInfo | null> {
    return this.agentPort.getAgentById(id);
  }

  public watchAgentStatus(
    id: string,
    intervalMs = INTERVAL_MS
  ): Observable<AgentStatus> {
    return timer(0, intervalMs).pipe(
      switchMap(() => this.getAgentById(id)),
      map((agent) => agent?.status ?? AgentStatus.OFFLINE),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
}
