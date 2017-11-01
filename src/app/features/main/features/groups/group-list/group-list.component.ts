import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { GroupsService } from '../../../../../common/core/services/groups.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html'
})
export class GroupListComponent implements OnInit, OnDestroy {
  groups;
  searchText = '';
  private groups$: Subscription;
  specialities;
  @ViewChild('search') searchInput;

  constructor(private groupsService: GroupsService) {}

  ngOnInit(): void {
    Observable.forkJoin(
      this.groupsService.getGroups(),
      this.groupsService.getStudents()
    ).take(1).subscribe(data => {
      console.log(data[0]);
      this.groups = data[0];
    });
  }

  ngOnDestroy(): void {
    this.groups$.unsubscribe();
  }

  filterGroups() {
    this.searchText = this.searchInput.nativeElement.value;
  }
}
