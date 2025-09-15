import { MessageEntity } from "../../domain/entity/messsage.entity";
import { Observable } from "rxjs";


export interface MessagePort {
    create(message: MessageEntity, id: string): Observable<MessageEntity>;
    findById(id: string): Observable<MessageEntity[] | null>;
    
}   