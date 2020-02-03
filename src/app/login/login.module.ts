import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import {LoginRoutingModule} from "./login-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatSelectModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import { RegisterFormComponent } from './register-form/register-form.component';
import {AppCommonsModule} from "../core/commons/commons.module";



@NgModule({
  declarations: [LoginFormComponent, RegisterFormComponent],
  imports: [
    CommonModule,
    AppCommonsModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatSelectModule,
  ]
})
export class LoginModule { }
