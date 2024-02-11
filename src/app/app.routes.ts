import { Routes } from '@angular/router';
import {canActivateQuiz} from "./shared/guards/can-activate.quiz";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/landing-page/landing-page.component').then(mod => mod.LandingPageComponent)
  },
  {
    path: 'quiz',
    loadComponent: () => import('./pages/quiz-page/quiz-page.component').then(mod => mod.QuizPageComponent),
    canActivate: [canActivateQuiz]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
