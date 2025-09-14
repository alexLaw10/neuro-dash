import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChatWrapperComponent } from './chat-wrapper.component';

const routes = [
  {
    path: '',
    component: ChatWrapperComponent
  }
];

@NgModule({
  declarations: [ChatWrapperComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ChatWrapperModule { }
