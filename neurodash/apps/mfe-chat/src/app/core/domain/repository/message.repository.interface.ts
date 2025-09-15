import { Observable } from "rxjs";
import { MessageEntity } from "../entity/messsage.entity";

export interface MessageRepository {
    findById(id: string): Observable<MessageEntity[] | null>;
    create(message: MessageEntity, id: string): Observable<MessageEntity>;
}