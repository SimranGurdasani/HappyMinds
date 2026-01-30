import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Booking, User } from './interfaces/booking.interface';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookSlotService {
  constructor(private httpClient: HttpClient) { }
  
  createSlot(slot: any): Observable<any> {
    return this.httpClient.post("http://localhost:8080/createSlots", slot);
  }

  // Create multiple slots using forkJoin to handle multiple requests
  createMultipleSlots(slots: any[]): Observable<any[]> {
    const requests = slots.map(slot => this.createSlot(slot));
    return forkJoin(requests);
  }

  getAllMyBookings(id:number): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/getAllMyBookings/${id}`);
  }

  updateActivityStatus(bookingId: number, completed: boolean) {
    return this.httpClient.put(`http://localhost:8080/updateActivityStatus/${bookingId}`, { completed });
  }

  addBooking(booking: any): Observable<any> {
    console.log(booking);
    return this.httpClient.post("http://localhost:8080/addBookings", booking);
  }
  getAllBookings(): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>("http://localhost:8080/getAllBookings")
      .pipe(
        tap((bookings: any) => {
          console.log('Fetched bookings:', bookings);
        })
      );
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>("http://localhost:8080/getAllUsers")
      .pipe(
        tap((users: any) => {
          console.log('Fetched users:', users);
        })
      );
  }
  

  
}