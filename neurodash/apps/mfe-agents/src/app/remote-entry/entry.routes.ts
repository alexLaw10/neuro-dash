import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';

export const remoteRoutes: Route[] = [
  { 
    path: '', 
    component: RemoteEntryComponent,
    children: [
      {
        path: '',
        redirectTo: 'agents',
        pathMatch: 'full'
      },
      {
        path: 'agents',
        loadChildren: () =>
          import('../core/presentation/features/list/list.module').then((m) => m.ListModule),
      }
    ]
  },
];
