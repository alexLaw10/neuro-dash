import { InjectionToken, Provider } from "@angular/core";
import { MessageRepository } from "../../domain/repository/message.repository.interface";
import { MessageRepositoryImpl } from "../repositories/message.repository.impl";
import { MessageAdapter } from "../../application/adapters/message.adapter";
import { MessagePort } from "../../application/ports/message.port";
import { AgentAdapter } from "../../application/adapters/agent.adapter";
import { AgentPort } from "../../application/ports/agent.port";

export const MESSAGE_REPOSITORY_TOKEN = new InjectionToken<MessageRepository>('MessageRepository');
export const MESSAGE_PORT_TOKEN = new InjectionToken<MessagePort>('MessagePort');
export const AGENT_PORT_TOKEN = new InjectionToken<AgentPort>('AgentPort');

export const CORE_PROVIDERS: Provider[] = [
    {
        provide: MESSAGE_REPOSITORY_TOKEN,
        useClass: MessageRepositoryImpl  
    },
    {
        provide: MESSAGE_PORT_TOKEN,
        useClass: MessageAdapter
    },
    {
        provide: AGENT_PORT_TOKEN,
        useClass: AgentAdapter
    }
]