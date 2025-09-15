import { MessageRepository } from './../../domain/repository/message.repository.interface';
import { Inject, Injectable } from "@angular/core"; 
import { MESSAGE_REPOSITORY_TOKEN } from "../../infrastructure/config/dependecy-injection.config";
import { MessageEntity } from '../../domain/entity/messsage.entity';
import { Observable } from 'rxjs';


@Injectable() 
export class CreateMessageUseCase {
    constructor(@Inject(MESSAGE_REPOSITORY_TOKEN) private MessageRepository: MessageRepository) {}

    public execute(message: MessageEntity, id: string): Observable<MessageEntity> {
        return this.MessageRepository.create(message, id);
    }
}