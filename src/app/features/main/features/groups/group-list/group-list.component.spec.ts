import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GroupsService } from '@core/services';
import { GroupsServiceMock } from '@core/services/mocks';
import { GroupListComponent } from './group-list.component';

describe('GroupListComponent', () => {
  let component: GroupListComponent;
  let fixture: ComponentFixture<GroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupListComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
        NgbModule.forRoot()
      ],
      providers: [
        { provide: GroupsService, useValue: new GroupsServiceMock() },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set up groups', inject([GroupsService], (groupsService: GroupsService) => {
    expect(component.groups.length).toEqual(1);
  }));

  it('updateGroups should filter groups', inject([GroupsService], (groupsService: GroupsService) => {
    spyOn(groupsService, 'getGroups').and.callThrough();
    component.updateGroups();

    expect(groupsService.getGroups).toHaveBeenCalledWith(component.a);
    expect(component.groups.length).toEqual(1);
  }));

  it('changeFirst should change the name of first group', () => {
    expect(component.groups[0].group_name).toEqual('test');
    component.changeFirst();
    expect(component.groups[0].group_name).toEqual('testssss');
  });
});
