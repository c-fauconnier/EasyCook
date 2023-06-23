import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BootstrapModule } from './bootstrap.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, MaterialModule],
    exports: [MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule, BootstrapModule],
})
export class SharedModule {}
