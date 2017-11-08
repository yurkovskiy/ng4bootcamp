import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, PreloadAllModules } from '@angular/router';

import { AuthGuard } from '@core/guards/auth.guard';
import {SignInComponent} from './features/auth/sign-in/sign-in.component';

const routes: Route[] = [
  {
    path: 'main',
    canLoad: [AuthGuard],
    loadChildren: 'app/features/main/main.module.ts#MainModule'
  },
  {
    component: SignInComponent,
    path: 'signin'
  },
  {
    path: '**',
    redirectTo: 'main'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
