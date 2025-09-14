import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ListComponent } from './list.component';
import { listRoutes } from './list.routing';
import { CORE_PROVIDERS } from '../../../infrastructure/config/dependency-injection.config';
import { AgentsService } from '../../../application/services/agents.service';
import { GetAllAgentsUseCase } from '../../../application/user-cases/get-all-agents.use-case';
import { GetAgentByIdUseCase } from '../../../application/user-cases/get-by-id-agents.user.case';
import { DeleteAgentUseCase } from '../../../application/user-cases/delete-agents.use-case';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(listRoutes)
  ],
  providers: [
    ...CORE_PROVIDERS,
    GetAllAgentsUseCase,
    GetAgentByIdUseCase,
    DeleteAgentUseCase,
    AgentsService
  ]
})
export class ListModule { }
