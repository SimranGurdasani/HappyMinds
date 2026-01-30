import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ClientData {
  a_id: number;
  d_id?: number;
  client_name: string;
  client_address: string;
  client_region: string;
  q1_daily_routine: string;
  q1_answer: number;
  q2_social_connections: string;
  q2_answer: number;
  q3_home_environment: string;
  q3_answer: number;
  q4_future_outlook: string;
  q4_answer: number;
  q5_self_care: string;
  q5_answer: number;
  q6_stress_management: string;
  q6_answer: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8080'; // Update with your API URL

  constructor(private http: HttpClient) { }

  getCollectedData(a_id:any): Observable<ClientData[]> {
    return this.http.get<ClientData[]>(`${this.apiUrl}/getCollectedData/${a_id}`);
  }

  addClientData(data: ClientData): Observable<ClientData> {
    return this.http.post<ClientData>(`${this.apiUrl}/addData`, data);
  }
}
