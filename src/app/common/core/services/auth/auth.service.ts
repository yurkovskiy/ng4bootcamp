import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  private isLoggedIn$ = new BehaviorSubject(true);

  constructor() { }

  isLoggedIn(): any {
    return this.isLoggedIn$;
  }

  signIn(): void {
    this.isLoggedIn$.next(true);
  }

  signOut(): void {
    this.isLoggedIn$.next(false);
  }
}
