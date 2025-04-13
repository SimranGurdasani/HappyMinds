import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookSlotService } from 'src/app/shared/book-slot.service';
import { TimeSlot } from 'src/app/shared/interfaces/timeslot.interface';
import { catchError, finalize } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-generate-slots',
  templateUrl: './generate-slots.component.html',
  styleUrls: ['./generate-slots.component.css']
})
export class GenerateSlotsComponent implements OnInit {
  slotForm!: FormGroup;
  generatedSlots: TimeSlot[] = [];
  showCustomizeModal = false;
  customSlot: TimeSlot = { startTime: '', endTime: '', isCustomized: false, isSelected: false };
  currentSlotIndex: number = -1;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private bookSlotService: BookSlotService
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.validateFormOnChanges();
  }

  private initializeForm() {
    this.slotForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      duration: ['', [Validators.required, Validators.min(1), Validators.max(480)]],
      breakTime: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
    });
  }

  private validateFormOnChanges() {
    this.slotForm.valueChanges.subscribe(values => {
      if (values.startDate && values.endDate) {
        const start = new Date(values.startDate);
        const end = new Date(values.endDate);
        
        if (end < start) {
          this.slotForm.get('endDate')?.setErrors({ endDateInvalid: true });
        }
      }

      if (values.startTime && values.endTime) {
        if (values.endTime <= values.startTime) {
          this.slotForm.get('endTime')?.setErrors({ endTimeInvalid: true });
        }
      }
    });
  }

  generateSlots() {
    if (this.slotForm.valid) {
      const formValue = this.slotForm.value;
      
      try {
        const startDate = new Date(formValue.startDate);
        const endDate = new Date(formValue.endDate);
        
        this.generatedSlots = [];
        
        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
          const [startHour, startMinute] = formValue.startTime.split(':');
          const [endHour, endMinute] = formValue.endTime.split(':');
          
          let currentTime = new Date(date);
          currentTime.setHours(parseInt(startHour), parseInt(startMinute), 0);
          
          const dayEnd = new Date(date);
          dayEnd.setHours(parseInt(endHour), parseInt(endMinute), 0);
          
          while (currentTime < dayEnd) {
            const slotEnd = new Date(currentTime);
            slotEnd.setMinutes(slotEnd.getMinutes() + formValue.duration);
            
            if (slotEnd <= dayEnd) {
              const slot = {
                startTime: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                endTime: slotEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isCustomized: false,
                isSelected: false
              };
              
              this.generatedSlots.push(slot);
            }
            
            currentTime = new Date(slotEnd);
            currentTime.setMinutes(currentTime.getMinutes() + formValue.breakTime);
          }
        }
      } catch (error) {
        console.error('Error generating slots:', error);
        this.errorMessage = 'Error generating slots. Please check your inputs.';
      }
    } else {
      this.errorMessage = 'Please fill all required fields correctly.';
    }
  }

  toggleSlot(index: number) {
    this.generatedSlots[index].isSelected = !this.generatedSlots[index].isSelected;
  }

  customizeSlot(index: number) {
    this.currentSlotIndex = index;
    this.customSlot = { ...this.generatedSlots[index] };
    this.showCustomizeModal = true;
  }

  saveCustomization() {
    if (this.currentSlotIndex !== -1) {
      this.generatedSlots[this.currentSlotIndex] = {
        ...this.customSlot,
        isCustomized: true
      };
    }
    this.closeModal();
  }

  closeModal() {
    this.showCustomizeModal = false;
    this.currentSlotIndex = -1;
  }

  hasSelectedSlots(): boolean {
    return this.generatedSlots.some(slot => slot.isSelected);
  }

  confirmSlots() {
    if (this.slotForm.valid && this.hasSelectedSlots()) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const formValue = this.slotForm.value;
      const startDate = new Date(formValue.startDate);
      const endDate = new Date(formValue.endDate);
      const selectedSlots = this.generatedSlots.filter(slot => slot.isSelected);
      const formattedSlots: any[] = [];

      // Create slots for each date in the range
      for (let currentDate = new Date(startDate); 
           currentDate <= endDate; 
           currentDate.setDate(currentDate.getDate() + 1)) {
        
        const currentDateStr = currentDate.toISOString().split('T')[0];
        
        selectedSlots.forEach(slot => {
          const formattedSlot = {
            therapistId: localStorage.getItem('adminId') ?? 1,
            date: currentDateStr,
            timeSlot: `${slot.startTime} - ${slot.endTime}`
          };
          formattedSlots.push(formattedSlot);
        });
      }

      // Send individual requests for each slot
      this.bookSlotService.createMultipleSlots(formattedSlots).pipe(
        catchError(error => {
          console.error('Error creating slots:', error);
          this.errorMessage = 'Failed to create slots. Please try again.';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe(response => {
        if (response) {
          this.slotForm.reset();
          this.generatedSlots = [];
          // You can add a success message here
        }
      });
    } else {
      this.errorMessage = 'Please select at least one slot and ensure all fields are valid.';
    }
  }
}