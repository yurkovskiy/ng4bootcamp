import {Component, OnInit, OnDestroy, AfterViewInit, QueryList, ViewChildren} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

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
export class GroupListComponent implements OnInit, OnDestroy, AfterViewInit {
  groups: any[] = [];
  groupsss: any;
  searchText = '';
  private groups$: Subscription;
  private test$: Subscription;
  @ViewChildren(GroupItemComponent) items: QueryList<GroupItemComponent>;

  constructor(private groupsService: GroupsService,
              private modalService: NgbModal,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      // console.log(data);
    });

    this.groupsService.getGroups().subscribe((data) => {
      this.groups = data;
    });
  }

  ngOnDestroy(): void {
    this.groups$.unsubscribe();
    // this.test$.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log(this.items);
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
