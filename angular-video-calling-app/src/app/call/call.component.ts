import { Component, Input, Signal, ViewChild } from '@angular/core';
import { CallingService } from '../calling.service';
import { CommonModule } from '@angular/common';
import { Call, StreamVideoParticipant } from '@stream-io/video-client';
import { ParticipantComponent } from '../participant/participant.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { CanvasComponent } from '../canvas/canvas.component';
import { PrescriptionComponent } from '../prescription/prescription.component';

@Component({
  selector: 'app-call',
  standalone: true,
  imports: [
    CommonModule, 
    ParticipantComponent, 
    CanvasComponent,
    PrescriptionComponent
  ],
  template: `
    <section>
      <div class="participants">
        <ng-container *ngFor="let participant of participants(); trackBy: trackBySessionId">
          <app-participant [participant]="participant"></app-participant>
        </ng-container>
      </div>

      <!-- Only show the interactive canvas to clients -->
      <app-canvas *ngIf="!isHost"></app-canvas>
      
      <!-- Only show prescription button to host -->
      <div *ngIf="isHost" class="prescription-button-container">
        <button class="btn btn-primary" (click)="openPrescription()">
          Create Prescription
        </button>
      </div>

      <!-- Prescription Component (controlled via ViewChild) -->
      <app-prescription #prescriptionComp (sidebarClosed)="onPrescriptionClosed()"></app-prescription>

      <div class="call-controls">
        <button (click)="toggleMicrophone()">Mic</button>
        <button (click)="toggleCamera()">Camera</button>
        <button class="leave-button" (click)="leaveCall()">Leave</button>
      </div>
    </section>
  `,
  styles: [`
    .prescription-button-container {
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 1000;
    }
    .call-controls {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
    }
    .leave-button {
      background-color: #dc3545;
      color: white;
    }
  `]
})
export class CallComponent {
  @Input({ required: true }) call!: Call;
  @ViewChild('prescriptionComp') prescriptionComponent!: PrescriptionComponent;
  
  isHost = false;
  participants: Signal<StreamVideoParticipant[]>;

  constructor(private callingService: CallingService) {
    this.isHost = localStorage.getItem('userRole') === 'therapist';
    this.participants = toSignal(
      this.callingService.call()!.state.participants$,
      { requireSync: true }
    );
  }

  openPrescription() {
    this.prescriptionComponent.openSidebar();
  }

  onPrescriptionClosed() {
    // Handle any logic needed after prescription sidebar is closed
  }

  toggleMicrophone() {
    this.call.microphone.toggle();
  }

  toggleCamera() {
    this.call.camera.toggle();
  }

  trackBySessionId(_: number, participant: StreamVideoParticipant) {
    return participant.sessionId;
  }

  leaveCall() {
    this.callingService.setCallId(undefined);
    window.location.href = 'http://localhost:4200';
  }
}