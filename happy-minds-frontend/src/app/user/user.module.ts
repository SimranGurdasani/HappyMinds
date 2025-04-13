import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFeedbackComponent } from './create-feedback/create-feedback.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { ViewAllTherapistsComponent } from './view-all-therapists/view-all-therapists.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { CanvasTestComponent } from './canvas-test/canvas-test.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr/toastr/toastr.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { QuestionOfTheDayComponent } from './question-of-the-day/question-of-the-day.component';


@NgModule({
  declarations: [
    CreateFeedbackComponent,
    MyBookingsComponent,
    ViewAllTherapistsComponent,
    BookAppointmentComponent,
    CanvasTestComponent,
    VideoCallComponent,
    QuestionOfTheDayComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    TranslateModule
    

  ]
})
export class UserModule { }
