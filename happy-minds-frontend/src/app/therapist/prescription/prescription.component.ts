// prescription.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';

interface Prescription {
  name: string;
  age: number;
  sex: string;
  officeId: string;
  date: string;
  mobile: string;
  symptoms: string;
  medications: any[];
  instructions: string;
  followUp: string;
  doctorName: string;
  doctorSpecialization: string;
}

@Component({
  selector: 'app-prescription',
  template: `
    <div class="container mx-4">
      <!-- Toggle Button -->
      <button class="btn btn-primary mb-3" (click)="toggleSidebar()">
        Create Prescription
      </button>

      <!-- Side Offcanvas -->
      <div class="offcanvas offcanvas-end" [class.show]="isOpen" tabindex="-1">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title">Create Prescription</h5>
          <button type="button" class="btn-close" (click)="toggleSidebar()"></button>
        </div>
        <div class="offcanvas-body">
          <form [formGroup]="prescriptionForm" (ngSubmit)="onSubmit()">
            <!-- Patient Details -->
            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" formControlName="name">
              </div>
              <div class="col-md-3">
                <label class="form-label">Age</label>
                <input type="number" class="form-control" formControlName="age">
              </div>
              <div class="col-md-3">
                <label class="form-label">Sex</label>
                <select class="form-control" formControlName="sex">
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
            </div>

            <!-- Office Details -->
            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label">Office ID</label>
                <input type="text" class="form-control" formControlName="officeId">
              </div>
              <div class="col-md-6">
                <label class="form-label">Mobile</label>
                <input type="text" class="form-control" formControlName="mobile">
              </div>
            </div>

            <!-- Symptoms -->
            <div class="mb-3">
              <label class="form-label">Symptoms</label>
              <input type="text" class="form-control" formControlName="symptoms">
            </div>

            <!-- Medications -->
            <div formArrayName="medications" class="mb-3">
              <h6>Medications</h6>
              <div *ngFor="let medication of medications.controls; let i=index" [formGroupName]="i">
                <div class="row mb-2">
                  <div class="col">
                    <input type="text" class="form-control" formControlName="name" placeholder="Medicine Name">
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" formControlName="frequency" placeholder="Frequency">
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" formControlName="duration" placeholder="Duration">
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" formControlName="notes" placeholder="Notes">
                  </div>
                  <div class="col-auto">
                    <button type="button" class="btn btn-danger" (click)="removeMedication(i)">Remove</button>
                  </div>
                </div>
              </div>
              <button type="button" class="btn btn-secondary" (click)="addMedication()">Add Medication</button>
            </div>

            <!-- Instructions and Follow-up -->
            <div class="mb-3">
              <label class="form-label">Instructions</label>
              <input type="text" class="form-control" formControlName="instructions">
            </div>
            <div class="mb-3">
              <label class="form-label">Follow Up Date</label>
              <input type="date" class="form-control" formControlName="followUp">
            </div>

            <!-- Doctor Details -->
            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label">Doctor Name</label>
                <input type="text" class="form-control" formControlName="doctorName">
              </div>
              <div class="col-md-6">
                <label class="form-label">Specialization</label>
                <input type="text" class="form-control" formControlName="doctorSpecialization">
              </div>
            </div>

            <button type="submit" class="btn btn-primary">Generate Prescription</button>
          </form>
        </div>
      </div>

      <!-- View Prescription Modal -->
      <div class="modal" [class.show]="showPreview" tabindex="-1" [style.display]="showPreview ? 'block' : 'none'">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Prescription Preview</h5>
              <button type="button" class="btn-close" (click)="closePreview()"></button>
            </div>
            <div class="modal-body" id="prescription-preview">
              <!-- Prescription Preview Content -->
              <div class="prescription-header">
                <div class="row">
                  <div class="col">
                    <p><strong>Name:</strong> {{prescriptionData?.name}}</p>
                    <p><strong>Age/Sex:</strong> {{prescriptionData?.age}}y / {{prescriptionData?.sex}}</p>
                    <p><strong>Office ID:</strong> {{prescriptionData?.officeId}}</p>
                  </div>
                  <div class="col text-end">
                    <p><strong>Date:</strong> {{currentDate}}</p>
                    <p><strong>Mobile:</strong> {{prescriptionData?.mobile}}</p>
                  </div>
                </div>
              </div>
              
              <div class="prescription-body mt-4">
                <p><strong>Symptoms:</strong> {{prescriptionData?.symptoms}}</p>
                
                <table class="table mt-3">
                  <thead>
                    <tr>
                      <th>Rx</th>
                      <th>Name</th>
                      <th>Frequency</th>
                      <th>Duration</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let med of prescriptionData?.medications; let i = index">
                      <td>{{i + 1}}</td>
                      <td>{{med.name}}</td>
                      <td>{{med.frequency}}</td>
                      <td>{{med.duration}}</td>
                      <td>{{med.notes}}</td>
                    </tr>
                  </tbody>
                </table>

                <div class="mt-4">
                  <p><strong>Instructions:</strong> {{prescriptionData?.instructions}}</p>
                  <p><strong>Follow up:</strong> {{prescriptionData?.followUp }}</p>
                </div>

                <div class="text-end mt-5">
                  <p><strong>{{prescriptionData?.doctorName}}</strong></p>
                  <p>{{prescriptionData?.doctorSpecialization}}</p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="closePreview()">Close</button>
              <button type="button" class="btn btn-primary" (click)="downloadPDF()">Download PDF</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .offcanvas {
      width: 800px;
    }
    .prescription-header {
      border-bottom: 1px solid #dee2e6;
      padding-bottom: 1rem;
    }
    .prescription-body {
      padding: 1rem 0;
    }
  `]
})
export class PrescriptionComponent implements OnInit {
  prescriptionForm: FormGroup;
  isOpen = false;
  showPreview = false;
  prescriptionData: Prescription | null = null;
  currentDate = new Date();

  constructor(private fb: FormBuilder) {
    this.prescriptionForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      sex: ['', Validators.required],
      officeId: ['', Validators.required],
      mobile: ['', Validators.required],
      symptoms: [''],
      medications: this.fb.array([]),
      instructions: [''],
      followUp: [''],
      doctorName: [''],
      doctorSpecialization: ['']
    });
  }

  ngOnInit() {
    this.addMedication(); // Add one medication row by default
  }

  get medications() {
    return this.prescriptionForm.get('medications') as FormArray;
  }

  addMedication() {
    const medicationForm = this.fb.group({
      name: [''],
      frequency: [''],
      duration: [''],
      notes: ['']
    });
    this.medications.push(medicationForm);
  }

  removeMedication(index: number) {
    this.medications.removeAt(index);
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  onSubmit() {
    if (this.prescriptionForm.valid) {
      this.prescriptionData = this.prescriptionForm.value;
      this.showPreview = true;
      this.isOpen = false;
    }
  }

  closePreview() {
    this.showPreview = false;
  }

  downloadPDF() {
    // const doc = new jsPDF();
    // const content = document.getElementById('prescription-preview');
    // if (content) {
    //   doc.html(content, {
    //     callback: function(doc) {
    //       doc.save('prescription.pdf');
    //     },
    //     x: 10,
    //     y: 10
    //   });
    // }
  }
}