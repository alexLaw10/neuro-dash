import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WorkbenchComponent } from './workbench.component';

const routes: Routes = [
  {
    path: '',
    component: WorkbenchComponent,
    children: [
      {
        path: 'agents',
        outlet: 'agents',
        loadChildren: () => import('mfe-agents/Module').then((m) => m.RemoteEntryModule)
      },
      {
        path: 'chat',
        outlet: 'chat',
        loadChildren: () => import('mfe-chat/Module').then((m) => m.RemoteEntryModule)
      }
    ]
  }
];

@NgModule({
  declarations: [WorkbenchComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class WorkbenchModule {}


