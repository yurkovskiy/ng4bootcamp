import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GroupsService {
  constructor(private http: HttpClient) {}

  getGroups(a = 1) {
    return this.http.get<any[]>(`/group/getRecords`);
  }

  getSpecialities() {
    return this.http.get(`/speciality/getRecords`);
  }
}
