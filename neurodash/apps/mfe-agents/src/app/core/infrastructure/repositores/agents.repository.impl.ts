import { Injectable } from "@angular/core";
import { Agent } from "../../domain/entities/agent.entity";
import { Observable } from "rxjs";  
import { AgentRepository } from "../../domain/repositories/agent.repository.interface"; 
import { HttpClient } from "@angular/common/http";


// post.repository.impl.ts
@Injectable()
export class AgentRepositoryImpl implements AgentRepository {
  private readonly baseUrl = 'http://localhost:3001/agents';
  constructor(private http: HttpClient) {}

  public findAll(): Observable<Agent[]> {
    return this.http.get<Agent[]>(this.baseUrl) as Observable<Agent[]>
  }

  public findById(id: string): Observable<Agent> {
    return this.http.get<Agent>(`${this.baseUrl}/${id}`) as Observable<Agent>
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`) as Observable<void>
  }
}