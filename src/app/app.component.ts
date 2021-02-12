import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ConceptX';

   passwordVisible = false;
   password?: string;
   inputValue = 'my site';

}
