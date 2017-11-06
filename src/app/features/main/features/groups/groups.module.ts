import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupItemComponent } from './group-item/group-item.component';
import { AddGroupComponent } from './add-group/add-group.component';

@NgModule({
  imports: [
    CommonModule,
    GroupsRoutingModule
  ],
  declarations: [
    GroupListComponent,
    GroupItemComponent,
    AddGroupComponent,
  ]
})
export class GroupsModule { }
