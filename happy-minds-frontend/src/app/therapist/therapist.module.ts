import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateSlotsComponent } from './generate-slots/generate-slots.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HistoryLogsComponent } from './history-logs/history-logs.component';
import { BrowserModule } from '@angular/platform-browser';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    GenerateSlotsComponent,
    HistoryLogsComponent,
    MyAppointmentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild([
      { path: 'my-appointments', component: MyAppointmentsComponent }
    ])
  ],
  exports:[
    GenerateSlotsComponent,
    HistoryLogsComponent,
    MyAppointmentsComponent
  ]
})
export class TherapistModule { }