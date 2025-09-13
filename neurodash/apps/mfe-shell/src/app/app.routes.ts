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
          import('mfe-chat/Module').then((m) => m.RemoteEntryModule),
      },
      {
        path: 'agents',
        loadChildren: () =>
          import('mfe-agents/Module').then((m) => m.RemoteEntryModule),
      },
    ],
  },
];
