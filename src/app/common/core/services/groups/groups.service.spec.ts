import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GroupsService } from './groups.service';

fdescribe('GroupsService', () => {
  let httpMock: HttpTestingController;
  let groupsService: GroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [GroupsService]
    });

    groupsService = TestBed.get(GroupsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([GroupsService], (service: GroupsService) => {
    expect(service).toBeTruthy();
  }));

  it('getGroups', (done) => {
    groupsService.getGroups().subscribe((res: any) => {
      done();
      expect(res[0].group_name).toEqual('test2');
    });

    const getGroupRequest = httpMock.expectOne('/group/getRecords');
    getGroupRequest.flush([{group_name: 'test2', group_id: 1}]);
    httpMock.verify();
  });
});
