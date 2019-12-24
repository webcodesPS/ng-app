import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router) {}

  public isLoggedInSource: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
    >(!!this.token);

  public readonly isLoggedIn: Observable<
    boolean
    > = this.isLoggedInSource.asObservable();

  public start(sessionToken: string): void {
    this.token = sessionToken;
    this.isLoggedInSource.next(true);
    this.router.navigate(['/']);
  }

  public terminate(): void {
    if (!this.isLoggedInSync) { return; }
    this.token = null;
    this.isLoggedInSource.next(false);
    this.router.navigate(['/login']);
  }

  get isLoggedInSync(): Observable<boolean> {
    return this.isLoggedInSource.asObservable();
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
}
