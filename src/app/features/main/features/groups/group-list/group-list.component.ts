import {Component, OnInit, OnDestroy, AfterViewInit, QueryList, ViewChildren} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { GroupsService } from '@core/services';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/interval';

import { GroupItemComponent } from '../group-item/group-item.component';
import { AddSubjectComponent } from '@shared/add-subject/add-subject.component';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html'
})
export class GroupListComponent implements OnInit {
  a = 2;
  groups: any[] = [];
  groupsss: any;
  searchText = '';
  private groups$: Subscription;
  private test$: Subscription;
  @ViewChildren(GroupItemComponent) items: QueryList<GroupItemComponent>;

  constructor(private groupsService: GroupsService,
              private modalService: NgbModal) {}

  ngOnInit(): void {
    this.groupsService.getGroups().subscribe((data) => {
      this.groups = data;
    });
  }

  updateGroups() {
    this.groupsService.getGroups(this.a).subscribe((data) => {
      this.groups = data;
    });
  }

  changeFirst(): void {
    this.groups[0].group_name = 'testssss';
  }

  addNew() {
    const modalRef: NgbModalRef = this.modalService.open(AddSubjectComponent);
    modalRef.componentInstance.data = 'test';
    modalRef.result.then((result: boolean) => {
      console.log('ok', result);
    }, () => {
      console.log('cancel');
    });
  }

  filterGroups() {
    // this.searchText = this.searchInput.nativeElement.value;
  }
}
