import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends AppComponent {
  constructor(public override auth: AuthenticationService) {
    super(auth);
  }
  public user = this.auth.getUserDetails();
}
