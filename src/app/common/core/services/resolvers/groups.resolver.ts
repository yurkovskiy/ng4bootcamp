import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { GroupsService } from '../groups/groups.service';

@Injectable()
export class GroupsResolver implements Resolve<any> {
  constructor(private groupsService: GroupsService) {}

  resolve(): any {
    return this.groupsService.getGroups();
  }
}
