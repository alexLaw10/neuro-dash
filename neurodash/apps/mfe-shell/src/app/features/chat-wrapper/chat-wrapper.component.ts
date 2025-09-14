import { Component, ElementRef, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

interface ReactRoot {
  unmount(): void;
}

interface RemoteModule {
  mount: (container: HTMLElement) => ReactRoot;
  unmount: (root: ReactRoot) => void;
}

@Component({
  selector: 'neurodash-chat-wrapper',
  template: '<div #chatContainer></div>'
})
export class ChatWrapperComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chatContainer', { static: true }) chatContainer!: ElementRef;
  private root: ReactRoot | null = null;
  private remoteModule: RemoteModule | null = null;

  constructor() {}

  async ngAfterViewInit() {
    try {
      console.log('🔄 Carregando mfe-chat...');
      console.log('🔄 URL do remote:', 'http://localhost:4202/remoteEntry.mjs');
      
      // Testar se o remote está acessível
      try {
        const response = await fetch('http://localhost:4202/remoteEntry.mjs');
        console.log('✅ Remote acessível:', response.status);
      } catch (fetchError) {
        console.error('❌ Remote não acessível:', fetchError);
      }
      
      const module: any = await import('mfe-chat/Module');
      
      console.log('✅ Módulo carregado:', module);
      console.log('module.mount:', module.mount);
      console.log('module.default:', module.default);
      console.log('module.keys:', Object.keys(module));
      
      // Tentar diferentes formas de acessar o módulo
      this.remoteModule = module.default || module;
      
      if (!this.remoteModule || !this.remoteModule.mount) {
        console.error('❌ Função mount não encontrada no módulo remoto');
        console.error('Módulo recebido:', this.remoteModule);
        console.error('Tentando acessar module.mount diretamente...');
        
        // Tentar acessar mount diretamente
        if (module.mount) {
          console.log('✅ Encontrou module.mount diretamente');
          this.remoteModule = { mount: module.mount, unmount: module.unmount };
        } else {
          console.error('❌ Nenhuma forma de acessar mount encontrada');
          return;
        }
      }
      
      const container = this.chatContainer?.nativeElement;
      if (container) {
        console.log('🎯 Chamando mount com container:', container);
        console.log('🎯 Container tagName:', container.tagName);
        console.log('🎯 Container parentElement:', container.parentElement);
        
        this.root = this.remoteModule.mount(container);
        console.log('✅ React app montado com sucesso!');
        console.log('✅ Root retornado:', this.root);
      } else {
        console.error('❌ Container não encontrado');
        console.error('chatContainer:', this.chatContainer);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar mfe-chat:', error);
      console.error('❌ Stack trace:', (error as Error).stack);
    }
  }

  ngOnDestroy() {
    console.log('🔄 Desmontando React app...');
    if (this.root && this.remoteModule) {
      this.remoteModule.unmount(this.root);
      this.root = null;
      console.log('✅ React app desmontado');
    }
  }
}
