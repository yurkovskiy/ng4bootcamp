import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GroupsService {
  constructor(private http: HttpClient) {}

  getGroups() {
    return this.http.get(`/group/getRecords`)
      .map((data) => {
        return data;
      });
  }

  getStudents() {
    return this.http.get(`/speciality/getRecords`);
  }
}
