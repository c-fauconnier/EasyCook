import { Component } from '@angular/core';
import { AuthenticationService } from './auth/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //title = 'easycook';
  constructor(public auth: AuthenticationService) {}
}
