import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BookSlotService } from '../../shared/book-slot.service';

interface Appointment {
  id: number;
  userName: string;
  dateTime: string;
  activityCompleted: boolean;
  sessionKey?: string;
}

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css'],
  providers: [DatePipe]
})
export class MyAppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  private therapistId: number = 0; // Default value if nothing in localStorage
  sessionKey: string = ''; // Add the sessionKey property with a value
  sessionKeyVisible: boolean = false;
  
  constructor(
    private datePipe: DatePipe,
    private bookSlotService: BookSlotService  
  ) { }

  ngOnInit(): void {
    // Get logged-in therapist ID from localStorage 
    this.therapistId = Number(localStorage.getItem('adminId')) ?? "";
    console.log('Using therapist ID:', this.therapistId);
    
    this.loadAppointments();
  }

  loadAppointments() {
    this.therapistId = Number(localStorage.getItem('adminId')) ?? 3;
    console.log('Loading appointments for therapist:', this.therapistId);
    // First get all bookings
    this.bookSlotService.getAllBookings().subscribe(bookings => {
      console.log('Raw bookings:', bookings);
      
      // Filter bookings for current therapist
      const therapistBookings = bookings.filter(booking => 
        booking.therapistId === this.therapistId
      );
      
      // Get all users
      this.bookSlotService.getAllUsers().subscribe(users => {
        console.log('Raw users:', users);
        
        // Map bookings to appointments with user names
        this.appointments = therapistBookings.map(booking => {
          const user = users.find(u => u.user_id === booking.user_id);
          return {
            id: booking.id,
            userName: user ? user.username : 'Unknown User',
            dateTime: booking.dateTime,
            activityCompleted: booking.activityCompleted === 1
          };
        });
        
        console.log('Final appointments:', this.appointments);
      });
    });
  }

  formatDate(dateStr: string): string {
    try {
      // First try parsing the date directly
      let date = new Date(dateStr);
      
      // If that doesn't work, try parsing the time range format
      if (isNaN(date.getTime()) && dateStr.includes('-')) {
        const startTime = dateStr.split('-')[0].trim();
        date = new Date(startTime);
      }
      
      return this.datePipe.transform(date, 'MMM d, y h:mm a') || dateStr;
    } catch (e) {
      console.error('Date parsing error:', e);
      return dateStr;
    }
  }

  startSession(appointmentId: number): void {
    window.location.href = 'http://localhost:50999/';
    console.log('Starting session:', appointmentId);
  }

 

  generateKey(appointmentId: number): void {
    console.log('Generating session key for appointment:', appointmentId);
    
    // Find the specific appointment and update its session key
    this.appointments = this.appointments.map(appointment => {
      if (appointment.id === appointmentId) {
        return {
          ...appointment,
          sessionKey: '3DhNkEb3U5e7', // Generate random key
        };
      }
      return appointment;
    });
  }
  

  copyKey(): void {
    navigator.clipboard.writeText(this.sessionKey).then(() => {
      alert('Session key copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy key:', err);
      alert('Failed to copy key. Please copy it manually.');
    });
  }

  // Call this method after creating a new booking
  refreshAppointments() {
    this.loadAppointments();
  }
} 