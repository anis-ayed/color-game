import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UserRoutingModule} from "./user-routing.module";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class UserModule { }
