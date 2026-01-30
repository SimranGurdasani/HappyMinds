import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { BookSlotService } from "src/app/shared/book-slot.service";
import { ViewAllTherapistsService } from "src/app/shared/view-all-therapists.service";
import { TranslateService } from "@ngx-translate/core"; // Import TranslateService
import { CookieService } from 'ngx-cookie-service';

interface BookingResponse {
  id: number;
  therapistId: number;
  dateTime: string;
  activityCompleted: number;
  therapistName?: string;
}

interface Booking {
  id: number;
  therapistName: string;
  dateTime: string;
  slotTaken: boolean;
  activityCompleted: number;
}

interface Therapist {
  therapistId: number;
  therapistName: string;
  city: string;
  speciality: string;
  gender: string;
  years_experience: number;
  qualifications: string;
  workplace: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
  providers: [DatePipe]
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  therapists: Therapist[] = [];
  private sessionKey: string = '';
  currentLang: string = 'en'; // Default language
  
  constructor(
    private datePipe: DatePipe,
    private getBookings: BookSlotService,
    private viewAllTherapist: ViewAllTherapistsService,
    private translateService: TranslateService,
    private cookieService: CookieService
  ) {
    // Initialize translate service
    this.translateService.setDefaultLang('en');
    // Get saved language preference or use browser language
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && (savedLang === 'en' || savedLang === 'hi')) {
      this.currentLang = savedLang;
    } else {
      // Try to use browser language if available and supported
      const browserLang = this.translateService.getBrowserLang();
      if (browserLang && (browserLang === 'en' || browserLang === 'hi')) {
        this.currentLang = browserLang;
      }
    }
    this.translateService.use(this.currentLang);
  }

  ngOnInit(): void {
    this.loadBookings();
    this.sessionKey = localStorage.getItem('sessionKey') || '';
    
    // Store userId in cookie if exists in localStorage
    const userId = localStorage.getItem("userId");
    if (userId) {
      this.cookieService.set('userId', userId, { 
        expires: 7, // Expires in 7 days
        path: '/',
        sameSite: 'Lax'
      });
    }
  }

  // Change language method
  switchLanguage(lang: string): void {
    this.currentLang = lang;
    this.translateService.use(lang);
    localStorage.setItem('preferredLanguage', lang);
  }
  loadBookings() {
    this.viewAllTherapist.getAllTheripast().subscribe((therapistsData: Therapist[]) => {
      this.therapists = therapistsData;
      
      // Get userId from cookie or localStorage
      const userId = this.cookieService.get('userId') || localStorage.getItem("userId");
      console.log('User ID:', userId);
      
      this.getBookings.getAllMyBookings(Number(userId) || 1).subscribe((bookingsData: BookingResponse[]) => {
        // Map bookings with correct therapist names
        this.bookings = bookingsData.map(booking => {
          // Find the therapist with matching ID
          const therapist = this.therapists.find(t => t.therapistId === booking.therapistId);
          
          return {
            id: booking.id,
            therapistName: therapist ? therapist.therapistName : `Unknown (ID: ${booking.therapistId})`,
            dateTime: booking.dateTime, // Keep the original format for use in formatDateTime
            slotTaken: true,
            activityCompleted: booking.activityCompleted === 1 ? 1 : 0
          };
        });
      });
    });
  }

  hasValidKey(bookingId: number): boolean {
    const storedKey = localStorage.getItem('sessionKey');
    const storedAppointmentId = localStorage.getItem('activeAppointmentId');
    const expiryTime = localStorage.getItem('sessionKeyExpiry');
    
    if (storedKey && storedAppointmentId && expiryTime) {
      const now = new Date().getTime();
      const expiry = parseInt(expiryTime);
      
      if (now < expiry && bookingId.toString() === storedAppointmentId) {
        this.sessionKey = storedKey;
        return true;
      } else if (now >= expiry) {
        // Clear expired key
        this.clearSessionData();
      }
    }
    return false;
  }

  private clearSessionData(): void {
    localStorage.removeItem('sessionKey');
    localStorage.removeItem('activeAppointmentId');
    localStorage.removeItem('sessionKeyExpiry');
    this.sessionKey = "";
  }

  joinSession(bookingId: number): void {
    window.location.href = 'http://localhost:50999/';
  }
  
  formatDateTime(dateTimeStr: string): string {
    // First, extract the date and time from the string
    // Example input: "2024-02-01T09:00 AM - 10:00 AM"
    const parts = dateTimeStr.split('T');
    if (parts.length !== 2) return dateTimeStr;

    const date = new Date(parts[0]);
    const timeRange = parts[1];

    // Format the date based on current language
    let dateFormat = 'EEEE, MMMM d, y';
    if (this.currentLang === 'hi') {
      // For Hindi, we can use the same format but the translate service will handle the translation
      dateFormat = 'EEEE, MMMM d, y';
    }
    
    const formattedDate = this.datePipe.transform(date, dateFormat, undefined, this.currentLang);
    
    // Return combined date and time
    return `${formattedDate}, ${timeRange}`;
  }

  isBookingTime(dateTimeStr: string): boolean {
    try {
      // Extract just the date and start time
      const [dateStr, timeRange] = dateTimeStr.split('T');
      const startTime = timeRange.split(' - ')[0];
      
      // Combine date and start time
      const bookingDateTime = new Date(`${dateStr} ${startTime}`);
      const now = new Date();

      // Check if current time is within 5 minutes of booking time
      return now >= new Date(bookingDateTime.getTime() - 5 * 60000);
    } catch (error) {
      console.error('Error parsing datetime:', error);
      return false;
    }
  }

  completeActivity(bookingId: number): void {
    this.getBookings.updateActivityStatus(bookingId, true).subscribe(
      (response: any) => {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
          booking.activityCompleted = 1;
        }
      },
      (error: any) => {
        console.error('Error updating activity status:', error);
      }
    );
  }
}