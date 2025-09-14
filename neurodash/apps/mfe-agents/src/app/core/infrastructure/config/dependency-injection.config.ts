import { Provider, InjectionToken } from '@angular/core';
import { AgentRepository } from '../../domain/repositories/agent.repository.interface';
import { AgentRepositoryImpl } from '../repositores/agents.repository.impl';    
import { AgentsPort } from '../../application/ports/agents.port';
import { AgentsAdapter } from '../../application/adpters/agents.adapter';


export const AGENT_REPOSITORY_TOKEN = new InjectionToken<AgentRepository>('AgentRepository');
export const AGENT_PORT_TOKEN = new InjectionToken<AgentsPort>('AgentPort');

export const CORE_PROVIDERS: Provider[] = [
  {
    provide: AGENT_REPOSITORY_TOKEN,
    useClass: AgentRepositoryImpl
  },
  {
    provide: AGENT_PORT_TOKEN,
    useClass: AgentsAdapter   
  }
];