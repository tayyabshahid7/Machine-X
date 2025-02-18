import { AuthenticationService } from '../../services/auth/authentication.service';

export function appInitializer(authenticationService: AuthenticationService) {
  return () => new Promise(resolve => {
    // attempt to refresh token on app start up to auto authenticate
    authenticationService.refreshToken()
      .subscribe()
      .add(resolve);
  });
}
