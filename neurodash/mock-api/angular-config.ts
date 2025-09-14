// Configuração para usar o Mock API no Angular
// Adicione este arquivo ao seu projeto Angular

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agent, AgentMetrics, ChatMessage, CreateAgentRequest, UpdateAgentConfigRequest, SendMessageRequest } from './types';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  private baseUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}

  // Agentes
  getAllAgents(): Observable<Agent[]> {
    return this.http.get<Agent[]>(`${this.baseUrl}/agents`);
  }

  getAgentById(id: string): Observable<Agent> {
    return this.http.get<Agent>(`${this.baseUrl}/agents/${id}`);
  }

  getAgentMetrics(id: string): Observable<AgentMetrics> {
    return this.http.get<AgentMetrics>(`${this.baseUrl}/agents/${id}/metrics`);
  }

  updateAgentConfig(id: string, config: UpdateAgentConfigRequest): Observable<Agent> {
    return this.http.put<Agent>(`${this.baseUrl}/agents/${id}/config`, config);
  }

  // Chat
  getChatMessages(agentId: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.baseUrl}/chatMessages?agentId=${agentId}`);
  }

  sendMessage(agentId: string, message: SendMessageRequest): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${this.baseUrl}/agents/${agentId}/chat`, message);
  }

  // Métricas
  getAllMetrics(): Observable<AgentMetrics[]> {
    return this.http.get<AgentMetrics[]>(`${this.baseUrl}/agentMetrics`);
  }
}

// Configuração do HttpClient para usar o Mock API
export const mockApiConfig = {
  baseUrl: 'http://localhost:3001/api',
  endpoints: {
    agents: '/agents',
    chatMessages: '/chatMessages',
    agentMetrics: '/agentMetrics'
  }
};
