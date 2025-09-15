import { MessageService } from '../../../application/services/message.service';
import { AgentService } from '../../../application/services/agent.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageEntity } from '../../../domain/entity/messsage.entity';
import { AgentInfo } from '../../../domain/entity/agent-info.entity';
import { AgentStatus } from '../../../domain/enums/agent-status.enum';
import { CommunicationService } from '../../../application/services/communication.service';

@Component({
  selector: 'neurodash-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  public messageForm: FormGroup;
  public messages: MessageEntity[] = [];
  public agentId = '1'; // ID do agente atual
  public agentInfo: AgentInfo | null = null;
  public isLoading = false;
  public isAgentTyping = false;
  public isAgentOffline = false;
  private statusSub?: Subscription;

  constructor(
    private fb: FormBuilder, 
    private MessageService: MessageService,
    private AgentService: AgentService,
    private route: ActivatedRoute,
    private communicationService: CommunicationService
  ) {
    this.messageForm = this.fb.group({
      message: ['']
    });
  }

  ngOnInit(): void {
    
    // Obtém o agentId dos query parameters
    this.route.queryParams.subscribe(params => {
      if (params['agentId']) {
        this.agentId = params['agentId'];
      }
      this.loadAgentInfo();
      this.loadMessages();
      
      // inicia polling de status do agente
      if (this.statusSub) {
        this.statusSub.unsubscribe?.();
      }
      this.statusSub = this.AgentService.watchAgentStatus(this.agentId, 4000)
        .subscribe((status) => {
          this.isAgentOffline = status === AgentStatus.OFFLINE;
          if (this.agentInfo) {
            this.agentInfo = { ...this.agentInfo, status, lastActivity: new Date() };
          } else {
            this.agentInfo = { id: this.agentId, name: '', status, lastActivity: new Date() } as AgentInfo;
          }
        });
    });
  }

  public loadAgentInfo(): void {
    this.AgentService.getAgentById(this.agentId).subscribe({
      next: (agentInfo: AgentInfo | null) => {
        this.agentInfo = agentInfo;
        this.isAgentOffline = agentInfo?.status === AgentStatus.OFFLINE;
      },
      error: () => {
        this.isAgentOffline = true; // Assume offline em caso de erro
      }
    });
  }

  public loadMessages(): void {
    this.isLoading = true;
    this.MessageService.findById(this.agentId).subscribe({
      next: (messages: MessageEntity[] | null) => {
        if (messages && messages.length > 0) {
          this.messages = messages; 
        } else {
          this.messages = []; 
        }
        this.isLoading = false;
      },
      error: () => {
        this.messages = [];
        this.isLoading = false;
      }
    });
  }

  public sendMessage(): void {
    // Verifica se o agente está offline
    if (this.isAgentOffline) {
      console.warn('Não é possível enviar mensagem: agente offline');
      return;
    }

    const messageContent = this.messageForm.value.message;
    if (messageContent) {
      this.MessageService.create(messageContent, this.agentId, 'user').subscribe({
        next: (message) => {
          this.messages.push(message); // Adiciona a nova mensagem à lista
          this.messageForm.patchValue({ message: '' }); // Limpa o campo
          
          // Emite evento global para atualizar a grid do agente específico
          const payload = {
            agentId: this.agentId,
            status: 'busy',
            lastActivity: new Date(),
            sender: 'user',
            timestamp: new Date(),
            teste: 'dasda'
          } as const;
          window.dispatchEvent(new CustomEvent('chat:messageSent', { detail: payload }));
          
          // Simula resposta do agente apenas se não estiver offline
          if (!this.isAgentOffline) {
            this.simulateAgentResponse();
          }
        }
      });
    }
  }

  private simulateAgentResponse(): void {
    // Mostra indicador de digitação
    this.isAgentTyping = true;
    
    // Simula delay de resposta (2-4 segundos)
    const responseDelay = Math.random() * 2000 + 2000; // 2-4 segundos
    
    setTimeout(() => {
      this.isAgentTyping = false;
      
      // Respostas simuladas do agente
      const agentResponses = [
        "Entendi sua mensagem! Como posso ajudar você?",
        "Interessante! Me conte mais sobre isso.",
        "Vou analisar sua solicitação e retornar em breve.",
        "Obrigado pela informação! Estou processando...",
        "Perfeito! Vou verificar isso para você.",
        "Compreendo. Deixe-me pensar na melhor solução.",
        "Excelente pergunta! Vou buscar mais detalhes.",
        "Entendi perfeitamente. Vou trabalhar nisso agora."
      ];
      
      const randomResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)];
      
      // Cria mensagem de resposta do agente
      const agentMessage: MessageEntity = {
        id: this.generateId(),
        agentId: this.agentId,
        message: randomResponse,
        sender: 'agent',
        timestamp: new Date(),
        isTyping: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        equals: (entity) => entity instanceof MessageEntity && entity.id === agentMessage.id
      } as MessageEntity;
      
      this.messages.push(agentMessage);
      // Emite evento global com status atualizado para quando o agente responde
      const payload = {
        agentId: this.agentId,
        status: 'online',
        lastActivity: agentMessage.timestamp,
        sender: 'agent',
        timestamp: agentMessage.timestamp
      } as const;
      window.dispatchEvent(new CustomEvent('chat:messageSent', { detail: payload }));
    }, responseDelay);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  ngOnDestroy(): void {
    this.statusSub?.unsubscribe?.();
  }
}
