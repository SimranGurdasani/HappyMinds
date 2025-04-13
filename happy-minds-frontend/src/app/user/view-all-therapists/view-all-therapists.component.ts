// import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
// import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
// import { ViewAllTherapistsService } from 'src/app/shared/view-all-therapists.service';
// import { Subscription } from 'rxjs';
// import { Router } from '@angular/router';
// import Swal from 'sweetalert2';
// import { BookSlotService } from 'src/app/shared/book-slot.service';

// @Component({
//   selector: 'app-view-all-therapists',
//   templateUrl: './view-all-therapists.component.html',
//   styleUrls: ['./view-all-therapists.component.css']
// })
// export class ViewAllTherapistsComponent implements OnInit, OnDestroy {
//   @ViewChild('bookingSidebar') bookingSidebar!: TemplateRef<any>;
  
//   private offcanvasRef: NgbOffcanvasRef | null = null;
//   allTherapists: any[] = [];
//   private subscriptions: Subscription[] = [];

//   filteredDoctors: any[] = [];
//   filters = { city: 'any', speciality: 'any', language: 'any', gender: 'any' };
//   noDoctorsMessage: string = "";

//   // Search Bar Property
//   searchQuery: string = "";

//   // Booking Modal Properties
//   selectedDoctor: any = null;
//   availableDates: any[] = [];
//   selectedDate: string | null = null;
//   availableSlots: any[] = [];
//   selectedSlot: string | null = null;

//   constructor(
//     private offcanvasService: NgbOffcanvas,
//     private viewAllTherapistsService: ViewAllTherapistsService,
//     private router: Router,
//     private bookAService: BookSlotService
//   ) {}

//   ngOnInit(): void {
//     this.loadTherapists();
//   }

//   ngOnDestroy(): void {
//     this.subscriptions.forEach(sub => sub.unsubscribe());
//     if (this.offcanvasRef) {
//       this.offcanvasRef.close();
//     }
//   }

//   private loadTherapists(): void {
//     const subscription = this.viewAllTherapistsService.getAllTheripast()
//       .subscribe({
//         next: (therapists) => {
//           this.allTherapists = therapists;
//           this.filteredDoctors = [...this.allTherapists];
//         },
//         error: (error) => {
//           console.error('Error fetching therapists:', error);
//           this.noDoctorsMessage = "Error loading therapists";
//         }
//       });
    
//     this.subscriptions.push(subscription);
//   }

//   // Open Booking Modal
//   openBookingModal(therapist: any): void {
//     if (!this.bookingSidebar) {
//       console.error('Booking sidebar template not found');
//       return;
//     }

//     // Create a copy of the therapist object and ensure name property exists
//     this.selectedDoctor = {
//       ...therapist,
//       name: therapist.name || therapist.therapistName
//     };
    
//     this.resetBookingState();
//     this.loadAvailableDates(therapist.therapistId);
    
//     // Open the offcanvas
//     this.offcanvasRef = this.offcanvasService.open(this.bookingSidebar, {
//       position: 'end',
//       backdrop: true,
//       keyboard: true
//     });
//   }

//   private resetBookingState(): void {
//     this.selectedDate = null;
//     this.selectedSlot = null;
//     this.availableDates = [];
//     this.availableSlots = [];
//   }

//   private loadAvailableDates(therapistId: string): void {
//     const subscription = this.viewAllTherapistsService.getAvailableDates(+therapistId)
//       .subscribe({
//         next: (dates) => {
//           this.availableDates = dates;
//           console.log('Available dates:', this.availableDates);
//         },
//         error: (error) => {
//           console.error('Error fetching available dates:', error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: 'Failed to load available dates. Please try again.',
//           });
//         }
//       });
    
//     this.subscriptions.push(subscription);
//   }
//   // Apply Filters
//   applyFilters(): void {
//     this.filteredDoctors = this.allTherapists.filter((therapist: any) => {
//       const matchesCity = this.filters.city === 'any' || therapist.city.toLowerCase() === this.filters.city.toLowerCase();
//       const matchesSpeciality = this.filters.speciality === 'any' || therapist.speciality.toLowerCase() === this.filters.speciality.toLowerCase();
//       const matchesLanguage = this.filters.language === 'any' || therapist.languages.toLowerCase().includes(this.filters.language.toLowerCase());
//       const matchesGender = this.filters.gender === 'any' || therapist.gender.toLowerCase() === this.filters.gender.toLowerCase();

//       return matchesCity && matchesSpeciality && matchesLanguage && matchesGender;
//     });

//     this.applySearch();
//   }

//   // Clear Filters
//   clearFilters(): void {
//     this.filters = { city: 'any', speciality: 'any', language: 'any', gender: 'any' };
//     this.filteredDoctors = [...this.allTherapists];
//     this.noDoctorsMessage = "";
//     this.applySearch();
//   }

//   // Apply Search
//   applySearch(): void {
//     if (this.searchQuery.trim() === "") {
//       this.filteredDoctors = [...this.allTherapists];
//       this.noDoctorsMessage = this.filteredDoctors.length === 0 ? "No therapists available" : "";
//       return;
//     }

//     const query = this.searchQuery.toLowerCase();
//     this.filteredDoctors = this.allTherapists.filter((therapist) => {
//       const matchesName = therapist.name.toLowerCase().includes(query);
//       const matchesSpeciality = therapist.speciality.toLowerCase().includes(query);
//       return matchesName || matchesSpeciality;
//     });

//     this.noDoctorsMessage = this.filteredDoctors.length === 0 ? "No therapists found" : "";
//   }

//   // Open Booking Modal
//   // Open Booking Modal
//   // openBookingModal(therapist: any): void {
//   //   // Create a copy of the therapist object and ensure name property exists
//   //   this.selectedDoctor = {
//   //     ...therapist,
//   //     name: therapist.name || therapist.therapistName // Handle both possible property names
//   //   };
    
//   //   this.selectedDate = null;
//   //   this.selectedSlot = null;
//   //   this.availableDates = [];
//   //   this.availableSlots = [];
    
//   //   // Fetch available dates for the selected therapist
//   //   const subscription = this.viewAllTherapistsService.getAvailableDates(therapist.therapistId)
//   //     .subscribe({
//   //       next: (dates) => {
//   //         this.availableDates = dates;
//   //         console.log('Available dates:', this.availableDates);
//   //       },
//   //       error: (error) => {
//   //         console.error('Error fetching available dates:', error);
//   //         Swal.fire({
//   //           icon: 'error',
//   //           title: 'Error',
//   //           text: 'Failed to load available dates. Please try again.',
//   //         });
//   //       }
//   //     });
    
//   //   this.subscriptions.push(subscription);
    
//   //   // Open the offcanvas
//   //   this.offcanvasService.open(this.bookingSidebar, { position: 'end' });
//   // }
//   // Select a Date
//   onDateSelect(date: string): void {
//     this.selectedDate = date;
//     this.selectedSlot = null; // Reset slot selection when date changes
    
//     const subscription = this.viewAllTherapistsService.getAllAvailableSlots(date)
//       .subscribe({
//         next: (slots) => {
//           this.availableSlots = slots;
//           console.log('Available slots:', slots);
//         },
//         error: (error) => {
//           console.error('Error fetching available slots:', error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: 'Failed to load available time slots. Please try again.',
//           });
//         }
//       });
    
//     this.subscriptions.push(subscription);
//   }

//   // Select a Slot
//   selectSlot(slot: string): void {
//     this.selectedSlot = slot;
//     console.log('Selected slot:', slot); // Debug log
//   }
//   proceedBooking(): void {
//     if (!this.selectedDoctor || !this.selectedDate || !this.selectedSlot) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Booking Error',
//         text: 'Please select both date and slot before proceeding.',
//         showConfirmButton: true
//       });
//       return;
//     }

//     const bookingData = {
//       therapistId: this.selectedDoctor.therapistId,
//       user_id: 3, // Replace with actual logged-in user ID
//       dateTime: `${this.selectedDate}T${this.selectedSlot}`,
//       activityCompleted: false
//     };

//     this.bookAService.addBooking(bookingData).subscribe({
//       next: (response) => {
//         console.log('Booking successful:', response);

//         Swal.fire({
//           icon: 'success',
//           title: 'Booking Confirmed!',
//           text: `Appointment booked with ${this.selectedDoctor.name} for ${this.selectedDate} at ${this.selectedSlot}`,
//           showConfirmButton: false,
//           timer: 2500
//         }).then(() => {
//           if (this.offcanvasRef) {
//             this.offcanvasRef.close();
//           }
//           this.router.navigate(['/my-bookings']);
//         });
//       },
//       error: (error) => {
//         console.error('Booking failed:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Booking Failed',
//           text: 'Could not book the appointment. Please try again.',
//           showConfirmButton: true
//         });
//       }
//     });
//   }
// }


import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { ViewAllTherapistsService } from 'src/app/shared/view-all-therapists.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BookSlotService } from 'src/app/shared/book-slot.service';

@Component({
  selector: 'app-view-all-therapists',
  templateUrl: './view-all-therapists.component.html',
  styleUrls: ['./view-all-therapists.component.css']
})
export class ViewAllTherapistsComponent implements OnInit, OnDestroy {
  @ViewChild('bookingSidebar') bookingSidebar!: TemplateRef<any>;
  
  isSidebarOpen: boolean = false; // Initialize to false
  private offcanvasRef: NgbOffcanvasRef | null = null;
  allTherapists: any[] = [];
  private subscriptions: Subscription[] = [];

  filteredDoctors: any[] = [];
  filters = { city: 'any', speciality: 'any', language: 'any', gender: 'any' };
  noDoctorsMessage: string = "";

  // Search Bar Property
  searchQuery: string = "";

  // Booking Modal Properties
  selectedDoctor: any = null;
  availableDates: any[] = [];
  selectedDate: string | null = null;
  availableSlots: any[] = [];
  selectedSlot: string | null = null;

  constructor(
    private offcanvasService: NgbOffcanvas,
    private viewAllTherapistsService: ViewAllTherapistsService,
    private router: Router,
    private bookAService: BookSlotService
  ) {}

  ngOnInit(): void {
    this.loadTherapists();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.closeSidebar();
  }

  private loadTherapists(): void {
    const subscription = this.viewAllTherapistsService.getAllTheripast()
      .subscribe({
        next: (therapists) => {
          this.allTherapists = therapists;
          this.filteredDoctors = [...this.allTherapists];
        },
        error: (error) => {
          console.error('Error fetching therapists:', error);
          this.noDoctorsMessage = "Error loading therapists";
        }
      });
    
    this.subscriptions.push(subscription);
  }

  // Open Booking Modal
  openBookingModal(therapist: any): void {
    if (!this.bookingSidebar) {
      console.error('Booking sidebar template not found');
      return;
    }

    // Set selected doctor
    this.selectedDoctor = {
      ...therapist,
      name: therapist.name || therapist.therapistName
    };
    
    this.resetBookingState();
    this.loadAvailableDates(therapist.therapistId);
    
    // Open the offcanvas
    this.offcanvasRef = this.offcanvasService.open(this.bookingSidebar, {
      position: 'end',
      backdrop: true,
      keyboard: true,
      scroll: true
    });

    // Set sidebar open state
    this.isSidebarOpen = true;

    // Handle dismissal
    this.offcanvasRef.dismissed.subscribe(() => {
      this.resetBookingState();
      this.isSidebarOpen = false;
    });
  }

  // Close Sidebar
  closeSidebar(): void {
    if (this.offcanvasRef) {
      this.offcanvasRef.close();
      this.isSidebarOpen = false;
    }
  }

  // Reset Booking State
  private resetBookingState(): void {
    this.selectedDate = null;
    this.selectedSlot = null;
    this.availableDates = [];
    this.availableSlots = [];
  }

  // Load Available Dates
  private loadAvailableDates(therapistId: string): void {
    const subscription = this.viewAllTherapistsService.getAvailableDates(+therapistId)
      .subscribe({
        next: (dates) => {
          // Ensure uniqueness by checking the "Date" property
          const uniqueDates = dates.filter((dateObj: any, index: number, self: any[]) =>
            index === self.findIndex((d) => d.Date === dateObj.Date)
          );
          this.availableDates = uniqueDates;
          console.log('Available dates:', this.availableDates);
        },
        error: (error) => {
          console.error('Error fetching available dates:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load available dates. Please try again.',
          });
        }
      });
    
    this.subscriptions.push(subscription);
  }
  // Apply Filters
  applyFilters(): void {
    this.filteredDoctors = this.allTherapists.filter((therapist: any) => {
      const matchesCity = this.filters.city === 'any' || therapist.city?.toLowerCase() === this.filters.city.toLowerCase();
      const matchesSpeciality = this.filters.speciality === 'any' || therapist.speciality?.toLowerCase() === this.filters.speciality.toLowerCase();
      const matchesLanguage = this.filters.language === 'any' || therapist.languages?.toLowerCase().includes(this.filters.language.toLowerCase());
      const matchesGender = this.filters.gender === 'any' || therapist.gender?.toLowerCase() === this.filters.gender.toLowerCase();

      return matchesCity && matchesSpeciality && matchesLanguage && matchesGender;
    });

    this.applySearch();
  }

  // Clear Filters
  clearFilters(): void {
    this.filters = { city: 'any', speciality: 'any', language: 'any', gender: 'any' };
    this.filteredDoctors = [...this.allTherapists];
    this.noDoctorsMessage = "";
    this.applySearch();
  }

  // Apply Search
  applySearch(): void {
    if (this.searchQuery.trim() === "") {
      this.filteredDoctors = [...this.allTherapists];
      this.noDoctorsMessage = this.filteredDoctors.length === 0 ? "No therapists available" : "";
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredDoctors = this.allTherapists.filter((therapist) => {
      const matchesName = therapist.name?.toLowerCase().includes(query) || therapist.therapistName?.toLowerCase().includes(query);
      const matchesSpeciality = therapist.speciality?.toLowerCase().includes(query);
      return matchesName || matchesSpeciality;
    });

    this.noDoctorsMessage = this.filteredDoctors.length === 0 ? "No therapists found" : "";
  }

  // Select a Date
  onDateSelect(date: string): void {
    this.selectedDate = date;
    this.selectedSlot = null; // Reset slot selection when date changes
    
    const subscription = this.viewAllTherapistsService.getAllAvailableSlots(date)
      .subscribe({
        next: (slots) => {
          this.availableSlots = slots.filter((slotsObj: any, index: number, self: any[]) =>
            index === self.findIndex((d) => d.timeSlot === slotsObj.timeSlot)
          );
          console.log('Available slots:', slots);
        },
        error: (error) => {
          console.error('Error fetching available slots:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load available time slots. Please try again.',
          });
        }
      });
    
    this.subscriptions.push(subscription);
  }

  // Select a Slot
  selectSlot(slot: string): void {
    this.selectedSlot = slot;
    console.log('Selected slot:', slot);
  }
  
  // Proceed Booking
  proceedBooking(): void {
    if (!this.selectedDoctor || !this.selectedDate || !this.selectedSlot) {
      Swal.fire({
        icon: 'error',
        title: 'Booking Error',
        text: 'Please select both date and slot before proceeding.',
        showConfirmButton: true
      });
      return;
    }

    const bookingData = {
      therapistId: this.selectedDoctor.therapistId,
      user_id: localStorage.getItem("userId") || 0, // Replace with actual logged-in user ID
      dateTime: `${this.selectedDate}T${this.selectedSlot}`,
      activityCompleted: false
    };
+
    this.bookAService.addBooking(bookingData).subscribe({
      next: (response) => {
        console.log('Booking successful:', response);

        Swal.fire({
          icon: 'success',
          title: 'Booking Confirmed!',
          text: `Appointment booked with ${this.selectedDoctor.name} for ${this.selectedDate} at ${this.selectedSlot}`,
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
          this.closeSidebar();
          this.router.navigate(['/my-bookings']);
        });
      },
      error: (error) => {
        console.error('Booking failed:', error);
        Swal.fire({
          icon: 'error',
          title: 'Booking Failed',
          text: 'Could not book the appointment. Please try again.',
          showConfirmButton: true
        });
      }
    });
  }
}
