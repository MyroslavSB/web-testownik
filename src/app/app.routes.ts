import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/landing-page/landing-page.component').then(mod => mod.LandingPageComponent)
  }
];
