import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService, ClientData } from '../data.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-data-entry-modal',
  templateUrl: './data-entry-modal.component.html',
  styleUrls: ['./data-entry-modal.component.css']
})
export class DataEntryModalComponent implements OnInit, OnChanges {
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() dataAdded = new EventEmitter<void>();
  
  clientForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  
  questions = {
    q1: 'How would you describe your typical day?',
    q2: 'How often do you connect with friends or family?',
    q3: 'How important is maintaining your living space?',
    q4: 'What are your thoughts about next year?',
    q5: 'When was the last time you did something just for yourself?',
    q6: 'What helps you most when things get challenging?'
  };
  
  stressOptions = [
    { value: 'A-Talking to someone', label: 'Talking to someone' },
    { value: 'B-Physical activity', label: 'Physical activity' },
    { value: 'C-Isolation', label: 'Being alone' },
    { value: 'D-Sleep/Rest', label: 'Sleep or rest' },
    { value: 'E-Distraction with TV/phone', label: 'TV, phone, or other distractions' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private authService: AuthService
  ) { 
    this.clientForm = this.formBuilder.group({
      client_name: ['', Validators.required],
      client_address: ['', Validators.required],
      client_region: ['', Validators.required],
      q1_answer: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      q2_answer: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      q3_answer: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      q4_answer: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      q5_answer: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      q6_answer: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.clientForm.reset();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showModal']?.currentValue) {
      this.clientForm.reset();
      this.submitted = false;
      this.error = '';
    }
  }

  get f() { return this.clientForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.clientForm.invalid) return;

    this.loading = true;
    const currentHelper = this.authService.currentUserValue;

    const clientData: ClientData = {
      a_id : +(localStorage.getItem('a_id') ?? '0'),
      client_name: this.f['client_name'].value,
      client_address: this.f['client_address'].value,
      client_region: this.f['client_region'].value,
      q1_daily_routine: this.questions.q1,
      q1_answer: this.f['q1_answer'].value,
      q2_social_connections: this.questions.q2, 
      q2_answer: this.f['q2_answer'].value,
      q3_home_environment: this.questions.q3,
      q3_answer: this.f['q3_answer'].value,
      q4_future_outlook: this.questions.q4,
      q4_answer: this.f['q4_answer'].value,
      q5_self_care: this.questions.q5,
      q5_answer: this.f['q5_answer'].value,
      q6_stress_management: this.questions.q6,
      q6_answer: this.f['q6_answer'].value
    };

    this.dataService.addClientData(clientData).subscribe({
      next: () => {
        this.dataAdded.emit();
        this.loading = false;
        this.onClose();
      },
      error: () => {
        this.error = 'Error adding data';
        this.loading = false;
      }
    });
  }

  onClose() {
    this.submitted = false;
    this.clientForm.reset();
    this.close.emit();
  }
}