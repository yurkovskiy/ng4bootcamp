import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, PreloadAllModules } from '@angular/router';

import { GroupsResolver } from '@core/resolvers/groups.resolver';
import { AuthGuard } from '@core/guards/auth.guard';

import { GroupListComponent } from './features/main/features/groups/group-list/group-list.component';
import { GroupItemComponent } from './features/main/features/groups/group-item/group-item.component';
import { MainComponent } from './features/main/components/main/main.component';
import { StudentsListComponent } from './features/main/features/students/students-list/students-list.component';
import {SignInComponent} from './features/auth/sign-in/sign-in.component';

const routes: Route[] = [
  {
    component: MainComponent,
    canActivateChild: [AuthGuard],
    path: 'main',
    children: [
      {
        path: 'groups',
        loadChildren: 'app/features/main/features/groups/groups.module.ts#GroupsModule'
      },
      {
        component: StudentsListComponent,
        path: 'students',
      },
      {
        path: '**',
        redirectTo: 'students'
      }]
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
  providers: [
    AuthGuard,
    GroupsResolver
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
