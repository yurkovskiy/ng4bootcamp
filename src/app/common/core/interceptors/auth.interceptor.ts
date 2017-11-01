import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '@environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(oldRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = oldRequest.clone({
      url: `${environment.apiUrl}${oldRequest.url}`
    });
    return next.handle(request);
  }
}
