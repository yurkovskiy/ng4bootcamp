import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { StudentsListComponent } from './features/students/students-list/students-list.component';

const routes: Route[] = [
  {
    component: MainComponent,
    path: '',
    children: [
      {
        path: 'groups',
        loadChildren: 'app/features/main/features/groups/groups.module.ts#GroupsModule'
      },
      // {
      //   component: StudentsListComponent,
      //   path: 'students',
      // },
      {
        path: '**',
        redirectTo: 'groups'
      }]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule { }
