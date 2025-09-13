import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    // Componentes core específicos do mfe-agents serão adicionados aqui
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    // Componentes core serão exportados aqui
  ],
  providers: [
    // Serviços singleton, interceptors, guards específicos do agents
    // Exemplo:
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule já foi carregado. Importe apenas no AppModule.');
    }
  }
}
