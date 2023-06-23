import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
//import { AuthenticationService } from '../auth/services/authentication.service';

@NgModule({
    declarations: [FooterComponent, NavbarComponent],
    imports: [CommonModule, SharedModule, RouterModule],
    //providers: [AuthenticationService],
    exports: [NavbarComponent, FooterComponent],
})
export class CoreModule {}
