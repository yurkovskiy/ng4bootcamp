import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupItemComponent } from './group-item/group-item.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { AddNewStudentComponent } from './add-new-student/add-new-student.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GroupsRoutingModule
  ],
  declarations: [
    GroupListComponent,
    GroupItemComponent,
    AddGroupComponent,
    AddNewStudentComponent,
  ]
})
export class GroupsModule { }
