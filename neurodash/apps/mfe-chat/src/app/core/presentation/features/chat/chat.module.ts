import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';
import { CORE_PROVIDERS } from '../../../infrastructure/config/dependecy-injection.config';
import { HttpClientModule } from '@angular/common/http';
import { CreateMessageUseCase } from '../../../application/user-cases/create-message.user-case';
import { MessageService } from '../../../application/services/message.service';
import { GetByIdMessageUseCase } from '../../../application/user-cases/get-by-id-message.user-case';
import { AgentService } from '../../../application/services/agent.service';
import { chatRoutes } from './chat.routes';


@NgModule({
  declarations: [ChatComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, RouterModule.forChild(chatRoutes)],
  providers: [...CORE_PROVIDERS, GetByIdMessageUseCase, CreateMessageUseCase, MessageService, AgentService],
  exports: [ChatComponent]
})

export class ChatModule { }