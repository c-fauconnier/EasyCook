import { Component } from '@angular/core';
import {
  AuthenticationService,
  TokenPayload,
} from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  credentials: TokenPayload = {
    username: '',
    password: '',
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/profile');
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
