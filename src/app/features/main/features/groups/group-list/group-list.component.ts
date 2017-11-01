import { Component } from '@angular/core';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html'
})
export class GroupListComponent {
  groups = [{name: 'Group 1'}, {name: 'Group 2'}];
  searchText = '';

  filterGroups(searchInput) {
    this.searchText = searchInput.value;
  }
}
