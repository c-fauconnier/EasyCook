import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
//import { AuthenticationService } from '../auth/services/authentication.service';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NavbarComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  //providers: [AuthenticationService],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
