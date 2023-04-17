import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
//import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  //providers: [AuthenticationService],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
