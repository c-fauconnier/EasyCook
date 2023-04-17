import { Component, OnInit, ElementRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent extends AppComponent implements OnInit {
  // boolean to add dynamically the 'aria-hidden' by attribute binding.
  isMobile = window.innerWidth <= 1023;

  constructor(
    private el: ElementRef,
    public override auth: AuthenticationService
  ) {
    super(auth);
  }

  ngOnInit(): void {
    this.onCloseWhenClickingOnMobile();
  }

  onCloseOnMobile() {
    // removes the visibility class and adds the hidden class.
    this.el.nativeElement.classList.remove('show-menu');
    this.el.nativeElement.classList.add('hide-menu');
    let button = document.getElementById('open-menu')!;
    button.classList.remove('hide-menu');
  }

  onCloseWhenClickingOnMobile() {
    // just on mobile devices.
    if (window.innerWidth <= 1023) {
      // when the menu or backdrop is clicked the menu is closed.
      this.el.nativeElement.addEventListener('click', () => {
        this.onCloseOnMobile();
      });
    }
  }
}
