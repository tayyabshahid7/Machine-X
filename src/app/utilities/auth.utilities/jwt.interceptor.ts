import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { catchError, filter, mergeMap, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { environment } from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private notification: NzNotificationService
  ) {
  }

  private tokenizeRequest(request: HttpRequest<any>) {
    const accessToken = this.authenticationService.getAccessToken();
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isApiUrl = request.url.startsWith(environment.APIUrl);
    if (isApiUrl) {
      if (this.authenticationService.isLoggedIn()) {
        request = this.tokenizeRequest(request);
      }

      return next.handle(request).pipe(
        catchError(responseError => {
          if (responseError instanceof HttpErrorResponse && responseError.status === 401 && !request.url.includes('login')) {
            return this.handle401Error(request, next, responseError);
          } else {
            return throwError(responseError);
          }
        })
      );
    }
    return next.handle(request);
  }

  private handle401Error(request, next, responseError): Observable<any> {

    if (request.url.includes('token/refresh')) {
      this.isRefreshing = false;
      this.authenticationService.removeAccessToken();
      if (this.router.url !== '/') {
        this.router.navigateByUrl('/login').then(() => {
          if ('error' in responseError && 'detail' in responseError.error && responseError.error.detail.includes('Incorrect')) {
            this.notification.info('Automatically logged out', 'You have been inactive for a long tim, please login again.');
          }
        });
      }
      return throwError(responseError);
    }

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authenticationService.refreshToken().pipe(
        switchMap((tokens: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(tokens.access);
          return next.handle(this.tokenizeRequest(request));
        }));
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        mergeMap(_ => {
          return next.handle(this.tokenizeRequest(request));
        }));
    }
  }

}
