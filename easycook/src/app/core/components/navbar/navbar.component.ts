import { Component, OnInit, ElementRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    constructor(public auth: AuthenticationService) {}

    ngOnInit(): void {}
}
