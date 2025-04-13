import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CallingService } from './calling.service';

@Injectable({
  providedIn: 'root'
})
export class CanvasSharingService {
  private canvasDataSubject = new BehaviorSubject<string | null>(null);
  canvasData$ = this.canvasDataSubject.asObservable();
  
  private userRole: string | null = null;
  private lastCanvasData: string | null = null;
  private clearDataTimeoutId: any = null;
  
  constructor(
    private callingService: CallingService
  ) {
    this.userRole = localStorage.getItem('userRole');
    
    // Set up custom event listening for canvas data
    if (this.callingService.call()) {
      this.setupCallEventListeners();
    }
  }
  
  setupCallEventListeners() {
    // Listen for canvas data events from the call
    this.callingService.call()?.on('custom', (event: any) => {
      if (event.type === 'canvas-update' && this.userRole === 'therapist') {
        console.log('Therapist received canvas update via Stream');
        this.lastCanvasData = event.data.canvasData;
        this.canvasDataSubject.next(event.data.canvasData);
      }
    });
  }
  
  // Simple method to broadcast canvas data
  broadcastCanvasData(canvasData: string) {
    console.log('Broadcasting canvas data');
    
    // Store the data temporarily
    this.lastCanvasData = canvasData;
    
    // Method 1: Using Stream Video custom events if available
    if (this.userRole === 'client' && this.callingService.call()) {
      this.callingService.call()?.sendCustomEvent({
        type: 'canvas-update',
        data: { canvasData }
      });
    }
    
    // Method 2: Using simple storage for direct retrieval
    localStorage.setItem('temp_canvas_data', canvasData);
    
    // Schedule cleanup after 10 minutes
    if (this.clearDataTimeoutId) {
      clearTimeout(this.clearDataTimeoutId);
    }
    this.clearDataTimeoutId = setTimeout(() => {
      localStorage.removeItem('temp_canvas_data');
      console.log('Temporary canvas data cleared');
    }, 10 * 60 * 1000); // 10 minutes
  }
  
  // Method to request latest canvas data (added to fix the error)
  requestLatestCanvasData() {
    console.log('Requesting latest canvas data');
    
    // Return the last known data if we have it
    if (this.lastCanvasData) {
      this.canvasDataSubject.next(this.lastCanvasData);
      return;
    }
    
    // Otherwise check localStorage
    const storedData = localStorage.getItem('temp_canvas_data');
    if (storedData) {
      this.lastCanvasData = storedData;
      this.canvasDataSubject.next(storedData);
    } else {
      console.log('No canvas data available');
    }
  }
  
  // Simple cleanup
  ngOnDestroy() {
    if (this.clearDataTimeoutId) {
      clearTimeout(this.clearDataTimeoutId);
    }
  }
}