import { Component, OnInit } from '@angular/core';

import { AuthService } from '@core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(data => {
      console.log(data);
    });
  }

  login(shouldLogin) {
    shouldLogin ?
      this.authService.signIn() :
      this.authService.signOut();
  }
}
