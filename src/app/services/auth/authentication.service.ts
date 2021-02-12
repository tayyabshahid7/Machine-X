import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AccessTokenResponseInterface } from '../../models/general.models';
import { Store } from '@ngrx/store';
import { clearStore } from '../../store/app/app.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private accessToken = null;
  persistToken = true;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store
  ) {
  }

  login(email: string, password: string, persist: boolean) {
    this.persistToken = persist;
    const body = {email, password, persist};
    return this.httpClient.post<AccessTokenResponseInterface>(`${environment.APIUrl}/login/`, body).pipe(
      tap(response => {
        this.setAccessToken(response.access);
      })
    );
  }

  refreshToken() {
    return this.httpClient.post<AccessTokenResponseInterface>(`${environment.APIUrl}/token/refresh/`, {persist: this.persistToken}).pipe(
      tap(response => {
        this.setAccessToken(response.access);
      })
    );
  }

  logout() {
    return this.httpClient.post<void>(`${environment.APIUrl}/logout/`, null).pipe(
      tap(_ => {
        this.removeAccessToken();
        this.router.navigateByUrl('/login');
        this.store.dispatch(clearStore());
      })
    );
  }

  isLoggedIn() {
    return this.accessToken !== null;
  }

  getAccessToken() {
    return this.accessToken;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  removeAccessToken() {
    this.accessToken = null;
  }
}
