import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { GroupsResolver } from '@core/resolvers/groups.resolver';

import { GroupListComponent } from './group-list/group-list.component';
import { GroupItemComponent } from './group-item/group-item.component';

const routes: Route[] = [
  {
    component: GroupListComponent,
    path: '',
    resolve: {
      groups: GroupsResolver
    },
    children: [{
      path: ':id',
      component: GroupItemComponent
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
  ],
  declarations: []
})
export class GroupsRoutingModule { }
