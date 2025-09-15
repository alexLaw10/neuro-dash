import { Observable } from "rxjs";
import { MessageEntity } from "../../domain/entity/messsage.entity";
import { MessagePort } from "../../application/ports/message.port";
import { MESSAGE_PORT_TOKEN } from "../../infrastructure/config/dependecy-injection.config";   

import { Injectable, Inject } from '@angular/core';


@Injectable()
export class MessageService {
   constructor(@Inject(MESSAGE_PORT_TOKEN) private messagePort: MessagePort) {}

   public create(messageText: string, agentId: string, sender: 'user' | 'agent' = 'user'): Observable<MessageEntity> {
    const message: MessageEntity = {
        id: this.generateId(),
        agentId: agentId,
        message: messageText,
        sender: sender,
        timestamp: new Date(),
        isTyping: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        equals: (entity) => entity instanceof MessageEntity && entity.id === message.id
    } as MessageEntity;
    
    return this.messagePort.create(message, agentId);
   }

   public findById(id: string): Observable<MessageEntity[] | null> {
    return this.messagePort.findById(id);
   }

   private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
   }

   private messageToDto(message: MessageEntity): MessageEntity {
    return {
        id: message.id,
        agentId: message.agentId,
        message: message.message,
        sender: message.sender,
        timestamp: message.timestamp,
        isTyping: message.isTyping,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
        equals: message.equals
    }
   }

}