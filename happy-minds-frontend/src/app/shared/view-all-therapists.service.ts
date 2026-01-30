import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Booking, User } from './interfaces/booking.interface';

@Injectable({
  providedIn: 'root'
})
export class ViewAllTherapistsService {
  updateUserLanguage(userId: string, language: string) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }
  
  getAllTheripast(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/getAllTheripast`);
  }

  getAvailableDates(therapistId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/getAllAvailableDates/${therapistId}`);
  }

  getAllAvailableSlots(date: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/getAllAvailableSlots/${date}`);
  }
  addBooking(booking: any): Observable<any> {
    console.log(booking);
    return this.httpClient.post("http://localhost:8080/addBookings", booking)
      .pipe(
        tap(() => {
          console.log('Booking added successfully');
        })
      );
  }

  getAllBookings(): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>("http://localhost:8080/getAllBookings")
      .pipe(
        tap(bookings => {
          console.log('Fetched bookings:', bookings);
        })
      );
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>("http://localhost:8080/getAllUsers")
      .pipe(
        tap(users => {
          console.log('Fetched users:', users);
        })
      );
  }
  
}