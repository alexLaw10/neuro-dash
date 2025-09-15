import { Observable } from 'rxjs';
import { MessageEntity } from '../../domain/entity/messsage.entity';
import { MESSAGE_REPOSITORY_TOKEN } from './../../infrastructure/config/dependecy-injection.config';
import { Inject, Injectable } from "@angular/core";
import { MessageRepository } from '../../domain/repository/message.repository.interface';

@Injectable()
export class GetByIdMessageUseCase {
constructor(@Inject(MESSAGE_REPOSITORY_TOKEN) private messagePort: MessageRepository) {}

    public execute(id: string): Observable<MessageEntity | null> {
        if (!id) {
            throw new Error('Message ID is required');
        }

        return this.messagePort.findById(id);
    }
}