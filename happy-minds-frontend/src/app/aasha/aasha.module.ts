import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AashaHelperComponent } from './aasha-helper/aasha-helper.component';
import { DataEntryModalComponent } from './data-entry-modal/data-entry-modal.component';
import { AuthGuard } from './auth.gaurd';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AashaHelperComponent,
    DataEntryModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    AashaHelperComponent,
    DataEntryModalComponent
  ],
  providers: [AuthService, DataService, AuthGuard]
})
export class AashaModule { }