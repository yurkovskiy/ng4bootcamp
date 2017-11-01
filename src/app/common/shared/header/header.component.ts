import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() currentRoute;
  @Output() routeChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeRoute(route) {
    this.routeChanged.emit(route);
  }
}
