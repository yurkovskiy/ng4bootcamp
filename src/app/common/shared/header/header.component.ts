import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { AuthService } from '@core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Input() currentRoute;
  @Output() routeChanged = new EventEmitter();
  isLoggedIn;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(data => {
      console.log(data);
    });
  }

  changeRoute(route) {
    this.routeChanged.emit(route);
  }

  login(shouldLogin) {
    shouldLogin ?
      this.authService.signIn() :
      this.authService.signOut();
  }
}
