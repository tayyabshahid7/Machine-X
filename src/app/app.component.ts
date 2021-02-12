import {Component, HostListener} from '@angular/core';
import {AuthenticationService} from './services/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'MahcineX';

   passwordVisible = false;
   password?: string;
   inputValue = 'my site';
    constructor(
        private authenticationService: AuthenticationService
    ) {
    }

    @HostListener('window:beforeunload', ['$event'])
    unloadHandler(event: Event) {
        if (this.authenticationService.isLoggedIn() && !this.authenticationService.persistToken) {
            this.authenticationService.logout().subscribe();
        }
    }
}
