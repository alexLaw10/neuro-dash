import { Component, AfterViewInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'neurodash-chat-web-component',
  template: '<chat-web-component></chat-web-component>',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatWebComponentComponent implements AfterViewInit, OnDestroy {
  private chatModule: any;

  async ngAfterViewInit() {
    try {
      // Importar o módulo que registra o Web Component
      this.chatModule = await import('mfe-chat/Module');
      console.log('Web Component do chat carregado:', this.chatModule);
      
      // Verificar se o Web Component foi registrado
      const webComponent = this.chatModule.default();
      if (webComponent) {
        console.log('Web Component registrado com sucesso:', webComponent);
      } else {
        console.warn('Web Component não foi encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar Web Component do chat:', error);
    }
  }

  ngOnDestroy() {
    // O Web Component se limpa automaticamente quando removido do DOM
  }
}
