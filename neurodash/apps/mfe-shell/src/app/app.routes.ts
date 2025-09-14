import { Route } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./features/chat-wrapper/chat-wrapper.module').then((m) => m.ChatWrapperModule),
      },
      {
        path: 'agents',
        loadChildren: () =>
          import('mfe-agents/Module').then((m) => {
            console.log('mfe-agents carregado com sucesso:', m);
            return m.RemoteEntryModule;
          }).catch((err) => {
            console.error('Erro ao carregar mfe-agents:', err);
            throw err;
          }),
      },
    ],
  },
];
