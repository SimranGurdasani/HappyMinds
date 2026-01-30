import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormArray, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
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
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <!-- Offcanvas Sidebar -->
    <div class="offcanvas" [class.show]="isOpen">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">Create Prescription</h5>
        <button type="button" class="close-btn" (click)="closeSidebar()">×</button>
      </div>
      <div class="offcanvas-body">
        <form [formGroup]="prescriptionForm" (ngSubmit)="onSubmit()">
          <!-- Patient Details -->
          <div class="form-row">
            <div class="form-group half-width">
              <label>Name</label>
              <input type="text" formControlName="name">
              <div *ngIf="prescriptionForm.get('name')?.touched && prescriptionForm.get('name')?.invalid" class="error-text">
                Name is required
              </div>
            </div>
            <div class="form-group quarter-width">
              <label>Age</label>
              <input type="number" formControlName="age">
              <div *ngIf="prescriptionForm.get('age')?.touched && prescriptionForm.get('age')?.invalid" class="error-text">
                Age is required
              </div>
            </div>
            <div class="form-group quarter-width">
              <label>Sex</label>
              <select formControlName="sex">
                <option value="">Select</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
              <div *ngIf="prescriptionForm.get('sex')?.touched && prescriptionForm.get('sex')?.invalid" class="error-text">
                Sex is required
              </div>
            </div>
          </div>

          <!-- Office Details -->
          <div class="form-row">
            <div class="form-group half-width">
              <label>Office ID</label>
              <input type="text" formControlName="officeId">
              <div *ngIf="prescriptionForm.get('officeId')?.touched && prescriptionForm.get('officeId')?.invalid" class="error-text">
                Office ID is required
              </div>
            </div>
            <div class="form-group half-width">
              <label>Mobile</label>
              <input type="text" formControlName="mobile">
              <div *ngIf="prescriptionForm.get('mobile')?.touched && prescriptionForm.get('mobile')?.invalid" class="error-text">
                Mobile is required
              </div>
            </div>
          </div>

          <!-- Symptoms -->
          <div class="form-group">
            <label>Symptoms</label>
            <textarea formControlName="symptoms" rows="3"></textarea>
          </div>

          <!-- Medications -->
          <div formArrayName="medications" class="medications-section">
            <h6>Medications</h6>
            <div *ngFor="let medication of medications.controls; let i=index" [formGroupName]="i" class="medication-item">
              <div class="form-row">
                <div class="form-group half-width">
                  <label>Medicine Name</label>
                  <input type="text" formControlName="name" placeholder="Medicine Name">
                </div>
                <div class="form-group half-width">
                  <label>Frequency</label>
                  <input type="text" formControlName="frequency" placeholder="Frequency">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group half-width">
                  <label>Duration</label>
                  <input type="text" formControlName="duration" placeholder="Duration">
                </div>
                <div class="form-group half-width">
                  <label>Notes</label>
                  <input type="text" formControlName="notes" placeholder="Notes">
                </div>
              </div>
              <div class="text-right">
                <button type="button" class="remove-btn" (click)="removeMedication(i)">Remove</button>
              </div>
            </div>
            <button type="button" class="secondary-btn" (click)="addMedication()">Add Medication</button>
          </div>

          <!-- Instructions and Follow-up -->
          <div class="form-group">
            <label>Instructions</label>
            <textarea formControlName="instructions" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>Follow Up Date</label>
            <input type="date" formControlName="followUp">
          </div>

          <!-- Doctor Details -->
          <div class="form-row">
            <div class="form-group half-width">
              <label>Doctor Name</label>
              <input type="text" formControlName="doctorName">
            </div>
            <div class="form-group half-width">
              <label>Specialization</label>
              <input type="text" formControlName="doctorSpecialization">
            </div>
          </div>

          <button type="submit" class="primary-btn">Generate Prescription</button>
        </form>
      </div>
    </div>

    <!-- Backdrop for offcanvas -->
    <div class="backdrop" [class.show]="isOpen" *ngIf="isOpen" (click)="closeSidebar()"></div>

    <!-- Prescription Preview Modal -->
    <div class="modal" [class.show]="showPreview">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Prescription Preview</h5>
            <button type="button" class="close-btn" (click)="closePreview()">×</button>
          </div>
          <div class="modal-body">
            <!-- Prescription Preview Content -->
            <div id="prescription-preview" class="prescription-container">
              <div class="prescription-header">
                <div class="header-row">
                  <div class="header-col">
                    <p><strong>Name:</strong> {{prescriptionData?.name}}</p>
                    <p><strong>Age/Sex:</strong> {{prescriptionData?.age}}y / {{prescriptionData?.sex === 'M' ? 'Male' : 'Female'}}</p>
                    <p><strong>Office ID:</strong> {{prescriptionData?.officeId}}</p>
                  </div>
                  <div class="header-col right">
                    <p><strong>Date:</strong> {{currentDate | date:'mediumDate'}}</p>
                    <p><strong>Mobile:</strong> {{prescriptionData?.mobile}}</p>
                  </div>
                </div>
              </div>
              
              <div class="prescription-body">
                <p><strong>Symptoms:</strong> {{prescriptionData?.symptoms}}</p>
                
                <div class="medications-table">
                  <h5>Rx</h5>
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
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
                </div>

                <div class="instructions">
                  <p><strong>Instructions:</strong> {{prescriptionData?.instructions}}</p>
                  <p><strong>Follow up:</strong> {{prescriptionData?.followUp | date:'mediumDate'}}</p>
                </div>

                <div class="doctor-signature">
                  <p><strong>{{prescriptionData?.doctorName}}</strong></p>
                  <p>{{prescriptionData?.doctorSpecialization}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="secondary-btn" (click)="closePreview()">Close</button>
            <button type="button" class="primary-btn" (click)="downloadPDF()">Download PDF</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal backdrop -->
    <div class="modal-backdrop" [class.show]="showPreview" *ngIf="showPreview"></div>
  `,
  styles: [`
    /* General Styles */
    * {
      box-sizing: border-box;
      font-family: Arial, sans-serif;
    }
    
    /* Form Elements */
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }
    
    input, select, textarea {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-bottom: 5px;
    }
    
    /* Layout */
    .form-row {
      display: flex;
      margin: 0 -10px 15px -10px;
      flex-wrap: wrap;
    }
    
    .form-group {
      margin-bottom: 15px;
      padding: 0 10px;
      width: 100%;
    }
    
    .half-width {
      width: 50%;
    }
    
    .quarter-width {
      width: 25%;
    }
    
    @media (max-width: 768px) {
      .half-width, .quarter-width {
        width: 100%;
      }
    }
    
    .text-right {
      text-align: right;
    }
    
    /* Buttons */
    .primary-btn {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      width: 100%;
    }
    
    .secondary-btn {
      background-color: #6c757d;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }
    
    .remove-btn {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      line-height: 1;
    }
    
    /* Offcanvas Sidebar */
    .offcanvas {
      position: fixed;
      top: 0;
      right: 0;
      width: 800px;
      height: 100%;
      background-color: white;
      z-index: 1050;
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
      box-shadow: -2px 0 5px rgba(0,0,0,0.1);
      overflow-y: auto;
    }
    
    .offcanvas.show {
      transform: translateX(0);
    }
    
    .offcanvas-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      border-bottom: 1px solid #dee2e6;
    }
    
    .offcanvas-title {
      margin: 0;
      font-size: 1.25rem;
    }
    
    .offcanvas-body {
      padding: 20px;
    }
    
    /* Backdrop */
    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      z-index: 1040;
      display: none;
    }
    
    .backdrop.show {
      display: block;
    }
    
    /* Modal */
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: none;
      z-index: 1060;
      overflow-x: hidden;
      overflow-y: auto;
    }
    
    .modal.show {
      display: block;
    }
    
    .modal-dialog {
      position: relative;
      width: auto;
      margin: 1.75rem auto;
      max-width: 800px;
      pointer-events: none;
    }
    
    .modal-content {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      pointer-events: auto;
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 0 20px rgba(0,0,0,0.15);
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      border-bottom: 1px solid #dee2e6;
    }
    
    .modal-body {
      position: relative;
      padding: 20px;
    }
    
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      padding: 15px 20px;
      border-top: 1px solid #dee2e6;
      gap: 10px;
    }
    
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      z-index: 1055;
      display: none;
    }
    
    .modal-backdrop.show {
      display: block;
    }
    
    /* Prescription Styling */
    .prescription-container {
      padding: 20px;
      border: 1px solid #dee2e6;
      background-color: white;
    }
    
    .prescription-header {
      border-bottom: 1px solid #dee2e6;
      padding-bottom: 15px;
      margin-bottom: 15px;
    }
    
    .header-row {
      display: flex;
      justify-content: space-between;
    }
    
    .header-col {
      flex: 1;
    }
    
    .header-col.right {
      text-align: right;
    }
    
    .prescription-body {
      padding-top: 15px;
    }
    
    .medications-table {
      margin: 20px 0;
    }
    
    .medications-table h5 {
      margin-bottom: 10px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
    }
    
    table th, table td {
      border: 1px solid #dee2e6;
      padding: 8px 12px;
      text-align: left;
    }
    
    table th {
      background-color: #f8f9fa;
    }
    
    .instructions {
      margin: 20px 0;
    }
    
    .doctor-signature {
      text-align: right;
      margin-top: 40px;
    }
    
    /* Medication Items */
    .medication-item {
      border: 1px solid #dee2e6;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 4px;
    }
    
    .medications-section {
      margin-bottom: 20px;
    }
    
    /* Error text */
    .error-text {
      color: #dc3545;
      font-size: 12px;
      margin-top: -5px;
      margin-bottom: 5px;
    }
  `]
})
export class PrescriptionComponent implements OnInit, OnDestroy {
  @Output() sidebarClosed = new EventEmitter<void>();

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
    // Start with at least one medication field
    this.addMedication();
    
    // Open the sidebar by default when component initializes
    setTimeout(() => {
      this.openSidebar();
    }, 0);
  }

  ngOnDestroy() {
    // Clean up any remaining backdrops
    this.isOpen = false;
    this.showPreview = false;
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

  // Public method that can be called from parent component
  openSidebar() {
    this.isOpen = true;
  }

  closeSidebar() {
    this.isOpen = false;
    this.sidebarClosed.emit();
  }

  onSubmit() {
    if (this.prescriptionForm.valid) {
      this.prescriptionData = this.prescriptionForm.value;
      this.showPreview = true;
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.prescriptionForm);
    }
  }

  // Helper method to mark all fields as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        for (let i = 0; i < control.length; i++) {
          if (control.at(i) instanceof FormGroup) {
            this.markFormGroupTouched(control.at(i) as FormGroup);
          }
        }
      }
    });
  }

  closePreview() {
    this.showPreview = false;
  }

  downloadPDF() {
    const doc = new jsPDF();
    const content = document.getElementById('prescription-preview');
    if (content) {
      try {
        doc.html(content, {
          callback: function(doc) {
            doc.save('prescription.pdf');
          },
          x: 10,
          y: 10,
          width: 180,
          windowWidth: 800
        });
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
      }
    } else {
      console.error('Prescription preview element not found');
      alert('Error: Could not find the prescription content.');
    }
  }
}