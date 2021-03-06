import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {
  faculties = [
    {id: 1, name: 'First one'},
    {id: 2, name: 'Second one'}
  ];
  specialities = [
    {id: 1, facultyId: 1, name: 'First spec'},
    {id: 2, facultyId: 2, name: 'Second one'},
    {id: 3, facultyId: 1, name: 'Third one'},
    {id: 4, facultyId: 2, name: 'Fourth'}
  ];
  availableSpecs = [];

  constructor() { }

  ngOnInit() {
  }

  onChange(event: HTMLSelectElement): void {
    this.availableSpecs = [];
    this.specialities.forEach(i => {
      if (i.facultyId === parseInt(event.target.value, 10)) {
        this.availableSpecs.push(i);
      }
    });
  }

  saveData(data): void {
    console.log(data);
  }
}
