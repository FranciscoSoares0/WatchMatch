import { Routes } from '@angular/router';
import { NotFoundComponent } from './layouts/components/not-found/not-found.component';
import { AuthGuard } from './auth/guards/auth-guard.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layouts/layout.routes').then((r) => r.routes),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((r) => r.routes),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
