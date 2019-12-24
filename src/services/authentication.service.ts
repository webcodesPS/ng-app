import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private isRefreshInProgressSource: BehaviorSubject<
    boolean
    > = new BehaviorSubject<boolean>(false);
  public isRefreshInProgress: Observable<
    boolean
    > = this.isRefreshInProgressSource.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/login_check`, { username, password })
      .pipe(
        map(res => {
          if (res.token) {
            localStorage.setItem('token', res.token);
          }

          return res;
        })
      );
  }
}
