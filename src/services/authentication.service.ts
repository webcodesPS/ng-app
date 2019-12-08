import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

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

  public getToken(): string {
    return this.token;
  }

  private set token(value: string) {
    if (value) {
      localStorage.setItem('token', value);
    } else {
      localStorage.removeItem('token');
    }
  }

  private get token(): string {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
