import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // Componentes reutilizáveis específicos do agents serão adicionados aqui
    // Exemplos: AgentCardComponent, AgentFormComponent, etc.
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
    // Componentes reutilizáveis serão exportados aqui
  ]
})
export class SharedModule { }
