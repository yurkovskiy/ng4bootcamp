import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class GroupsServiceMock {

  getGroups() {
    return Observable.of([{group_name: 'test', group_id: 1}]);
  }

  getSpecialities() {
    return Observable.of([{speciality_name: 'test', speciality_id: 1}]);
  }
}
