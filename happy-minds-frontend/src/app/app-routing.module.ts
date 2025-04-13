import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyBookingsComponent } from './user/my-bookings/my-bookings.component';
import { GenerateSlotsComponent } from './therapist/generate-slots/generate-slots.component';
import { MyAppointmentsComponent } from './therapist/my-appointments/my-appointments.component';
import { ViewAllTherapistsComponent } from './user/view-all-therapists/view-all-therapists.component';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { AdminSignupComponent } from './auth/admin-signup/admin-signup.component';
import { BooksComponent } from './resources/books/books.component';
import { HomeComponent } from './nfh/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AashaAuthComponent } from './aasha/aasha-auth/aasha-auth.component';
import { AashaHelperComponent } from './aasha/aasha-helper/aasha-helper.component';
import { DataEntryModalComponent } from './aasha/data-entry-modal/data-entry-modal.component';
import { QuestionOfTheDayComponent } from './user/question-of-the-day/question-of-the-day.component';



const routes: Routes = [{
  path:'my-bookings',
  component:MyBookingsComponent
},
{
  path:'generate-slots',
  component:GenerateSlotsComponent
},
{
  path:'my-appointments',
  component:MyAppointmentsComponent
},
{
  path:'view-all-therapists',
  component:ViewAllTherapistsComponent
},
{
    path:'home',
    component: HomeComponent
},
{
  path:'nav',
  component: NavbarComponent
},
{
  path:'aasha-auth',
  component: AashaAuthComponent
}
,
{
  path:'aasha-helper',
  component: AashaHelperComponent
},
{
  path:'data-entry-modal',
  component: DataEntryModalComponent
},
{
  path:'question-of-the-day',
  component:QuestionOfTheDayComponent
},
{
  path: '',
  component: AuthLayoutComponent,
  children: 
  [
    { path: '', redirectTo: 'user-login', pathMatch: 'full' },
    { path: 'user-login', component: LoginComponent },
    { path: 'user-signup', component: SignupComponent },
    { path: 'admin-login', component: AdminLoginComponent },
    { path: 'admin-signup', component: AdminSignupComponent },
  ],
},

{
  path:'**',
  component: AuthLayoutComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
