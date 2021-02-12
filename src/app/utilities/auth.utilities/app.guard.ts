import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { loadUser } from '../../store/user/user.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private store: Store
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.authenticationService.isLoggedIn();
    if (!isLoggedIn) {
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    } else {
      this.store.dispatch(loadUser());
    }
    return isLoggedIn;
  }

  canLoad() {
    return this.authenticationService.isLoggedIn();
  }

}
