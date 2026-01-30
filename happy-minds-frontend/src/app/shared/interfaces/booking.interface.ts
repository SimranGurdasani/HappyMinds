// src/app/shared/interfaces/booking.interface.ts
export interface User {
    user_id: number;
    username: string;
    email: string;
    phone_number: string;
  }
  
  export interface Booking {
    id: number;
    therapistId: number;
    user_id: number;
    dateTime: string;
    activityCompleted: number;
  }