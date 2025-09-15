import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private messageSentSubject = new Subject<string>();
  
  public messageSent$ = this.messageSentSubject.asObservable();
  
  public notifyMessageSent(agentId: string): void {
    this.messageSentSubject.next(agentId);
  }
}
