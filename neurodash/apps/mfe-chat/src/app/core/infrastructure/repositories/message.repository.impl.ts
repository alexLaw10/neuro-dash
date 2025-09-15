import { Injectable } from "@angular/core";
import { MessageRepository } from "../../domain/repository/message.repository.interface";
import { MessageEntity } from "../../domain/entity/messsage.entity";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class MessageRepositoryImpl implements MessageRepository {
    private readonly baseUrl = 'http://localhost:3001/api/agents';
    constructor(private http: HttpClient) {}

   public findById(id: string): Observable<MessageEntity[] | null> { 
    return this.http.get<MessageEntity[]>(`${this.baseUrl}/${id}/chatMessages`);
    }   

    public create(message: MessageEntity, id: string): Observable<MessageEntity> { 
        return this.http.post<MessageEntity>(`${this.baseUrl}/${id}/chatMessages`, message);
    }
}