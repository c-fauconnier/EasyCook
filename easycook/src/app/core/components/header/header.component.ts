import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // boolean to add dynamically the 'aria-hidden' by attribute binding.
  isMobile = window.innerWidth <= 1023;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 1023) {
      let navbar = document.getElementById('navbar')!;
      navbar.classList.add('desktop-only');
      navbar.classList.remove('hide-menu');
    }
  }

  constructor() {}

  ngOnInit() {}

  showMenu() {
    // removes the hidden class and adds the visibility class.
    let button = document.getElementById('open-menu')!;
    button.classList.add('hide-menu');
    let navbar = document.getElementById('navbar')!;
    navbar.classList.remove('desktop-only');
    navbar.classList.remove('hide-menu');
    navbar.classList.add('show-menu');
  }
}
