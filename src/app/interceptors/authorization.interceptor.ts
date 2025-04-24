import { LocalStorageService } from './../services/localStorage.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.localStorageService.getFromLocalStorage('token');

    let newRequest: HttpRequest<any> = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });

    return next.handle(newRequest);
  }
}
