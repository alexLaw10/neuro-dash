import { MessageEntity } from "../../domain/entity/messsage.entity";
import { Observable } from "rxjs";
import { MessagePort } from "../../application/ports/message.port";
import { GetByIdMessageUseCase } from "../user-cases/get-by-id-message.user-case";
import { CreateMessageUseCase } from "../user-cases/create-message.user-case";
import { Injectable } from "@angular/core";

@Injectable()
export class MessageAdapter implements MessagePort {
    constructor(
        private getByIdMessageUseCase: GetByIdMessageUseCase,
        private createMessageUseCase: CreateMessageUseCase
    ) {}

    public create(message: MessageEntity, id: string): Observable<MessageEntity> {
        return this.createMessageUseCase.execute(message, id);
    }

    public findById(id: string): Observable<MessageEntity | null> {
        return this.getByIdMessageUseCase.execute(id);
    }
}