import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { GroupsService } from '@core/services';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html'
})
export class GroupListComponent implements OnInit, OnDestroy {
  groups: any[] = [];
  groupsss: any;
  searchText = '';
  private groups$: Subscription;
  private test$: Subscription;
  @ViewChild('search') searchInput;

  constructor(private groupsService: GroupsService) {}

  ngOnInit(): void {
    this.groupsss = Observable.interval(1000)
      .distinct()
      .debounceTime(2000)
      .switchMap(() => {
        return this.groupsService.getGroups();
      });

    this.groups$ = this.groupsService.getGroups().subscribe(data => {
      this.groups = data;
    });
  }

  ngOnDestroy(): void {
    this.groups$.unsubscribe();
    // this.test$.unsubscribe();
  }

  filterGroups() {
    this.searchText = this.searchInput.nativeElement.value;
  }
}
