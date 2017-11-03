import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

import { AuthService } from '@core/services';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn().getValue()) {
      return true;
    }

    this.router.navigate(['/signin']);
    return false;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
