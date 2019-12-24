import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../../services/session.service';

@Injectable({ providedIn: 'root' })
export class AuthGuards implements CanActivate {
  constructor(
    private route: Router,
    private sessionSvc: SessionService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.sessionSvc.getToken();
    if (token) {
      return true;
    }

    this.route.navigate(['/login'], {queryParams: { returnUrl: state.url } });
    return false;
  }
}
