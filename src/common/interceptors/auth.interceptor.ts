import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse,} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {SessionService} from '../../services/session.service';
import {AuthenticationService} from '../../services/authentication.service';
import { tap, catchError, switchMap, first } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthenticationService, private sessionSvc: SessionService) { }

  addAuthHeader(request: HttpRequest<any>): HttpRequest<any> {
    if (!this.sessionSvc.getToken()) { return request; }

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.sessionSvc.getToken()}`
      }
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authSvc.isRefreshInProgress.pipe(
      first(),
      switchMap(() => next.handle(this.addAuthHeader(req))),
      tap(res => {
        if (!(res instanceof HttpResponse)) return;
        if (res.body.token) {
          this.sessionSvc.start(res.body.token);
        }
      }),
      catchError(err => {
        // if (err.status === 401)
        // this.sessionSvc.terminate();
        return throwError(err);
      })
    );
  }
}
