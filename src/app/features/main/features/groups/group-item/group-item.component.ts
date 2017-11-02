import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html'
})
export class GroupItemComponent implements OnInit{
  group;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((data) => {
      this.group = data.id;
    });
  }
}
