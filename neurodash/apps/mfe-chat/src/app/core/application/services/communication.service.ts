import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export interface ChatMessageEventPayload {
  agentId: string;
  status: 'online' | 'offline' | 'busy' | 'error';
  lastActivity: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private messageSentSubject = new Subject<ChatMessageEventPayload>();
  
  public messageSent$ = this.messageSentSubject.asObservable();
  
  public notifyMessageSent(payload: ChatMessageEventPayload): void {
    this.messageSentSubject.next(payload);
  }
}
