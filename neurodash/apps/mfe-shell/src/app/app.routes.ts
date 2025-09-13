import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'mfe-chat',
    loadChildren: () =>
      import('mfe-chat/Module').then((m) => m.RemoteEntryModule),
  },
  {
    path: 'mfe-agents',
    loadChildren: () =>
      import('mfe-agents/Module').then((m) => m.RemoteEntryModule),
  },
  {
    path: '',
    component: NxWelcomeComponent,
  },
];
