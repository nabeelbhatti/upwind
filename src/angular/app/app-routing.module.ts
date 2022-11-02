import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
  {
    path: 'pages',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },

  {
    path: 'auth',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.NgxAuthModule),
  },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
