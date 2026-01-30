import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { WebcamComponent } from './webcam/webcam.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    AdminSignupComponent,
    AdminLoginComponent,
    WebcamComponent,
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule 
  ],
  exports:[
    SignupComponent,
    LoginComponent,
    AdminSignupComponent,
    AdminLoginComponent,
    WebcamComponent,
    AuthLayoutComponent
  ]
})
export class AuthModule { }
