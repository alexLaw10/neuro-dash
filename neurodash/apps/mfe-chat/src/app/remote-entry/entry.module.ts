import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { remoteRoutes } from './entry.rote';
import { RemoteEntryComponent } from './entry.component';  


@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(remoteRoutes)
  ],
  providers: [],
})
export class RemoteEntryModule {}
