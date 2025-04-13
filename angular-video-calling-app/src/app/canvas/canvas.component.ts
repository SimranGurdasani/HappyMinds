import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasSharingService } from '../canvas-sharing.service';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @ViewChild('myCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D | null;
  currentTool: string = 'pencil';
  lineWidth: number = 2;
  strokeColor: string = '#000000';
  isModalOpen: boolean = false;
  isDrawing: boolean = false;
  startX: number = 0;
  startY: number = 0;
  userRole: string | null = null;
  
  // For storing temporary canvas state
  savedImageData: ImageData | null = null;
  
  // For more reliable updates
  private syncTimeout: any;
  private lastBroadcastTime: number = 0;
  
  constructor(
    private canvasSharingService: CanvasSharingService,
    private ngZone: NgZone
  ) {
    this.userRole = localStorage.getItem('userRole');
  }

  ngAfterViewInit() {
    this.initializeCanvas();
    
    // Force initial sync with empty canvas
    setTimeout(() => {
      this.forceBroadcastCanvasState();
    }, 1000);
  }
  
  ngOnInit() {
    // Setup periodic syncing of canvas state
    if (this.userRole === 'client') {
      this.ngZone.runOutsideAngular(() => {
        setInterval(() => {
          this.forceBroadcastCanvasState();
        }, 2000); // Sync every 2 seconds regardless of activity
      });
    }
  }

  openModal() {
    this.isModalOpen = true;
    setTimeout(() => {
      if (!this.canvasRef) return;  // Ensure ViewChild exists
      this.initializeCanvas();
      this.forceBroadcastCanvasState(); // Sync when canvas becomes visible
    }, 200);
  }
  
  closeModal() {
    this.isModalOpen = false;
  }

  private initializeCanvas() {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    if (this.ctx) {
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.setupEventListeners();
      
      // If reopening, force a broadcast
      if (this.isModalOpen) {
        this.forceBroadcastCanvasState();
      }
    }
  }

  private setupEventListeners() {
    this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    this.canvas.addEventListener('mousemove', this.draw.bind(this));
    this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
    this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
    
    // Touch support for mobile
    this.canvas.addEventListener('touchstart', this.handleTouch.bind(this, this.startDrawing));
    this.canvas.addEventListener('touchmove', this.handleTouch.bind(this, this.draw));
    this.canvas.addEventListener('touchend', this.stopDrawing.bind(this));
  }
  
  private handleTouch(handler: (event: MouseEvent) => void, event: TouchEvent) {
    event.preventDefault();
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    handler(mouseEvent);
  }

  private startDrawing(event: MouseEvent) {
    if (!this.ctx) return;
    
    this.isDrawing = true;
    const rect = this.canvas.getBoundingClientRect();
    this.startX = event.clientX - rect.left;
    this.startY = event.clientY - rect.top;
    
    this.ctx.strokeStyle = this.strokeColor;
    this.ctx.lineWidth = this.lineWidth;
    
    if (this.currentTool === 'pencil') {
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      
      // Schedule initial broadcast
      this.scheduleBroadcast();
    } else {
      // Save the current canvas state for shape drawing
      this.savedImageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  private draw(event: MouseEvent) {
    if (!this.isDrawing || !this.ctx) return;

    const rect = this.canvas.getBoundingClientRect();
    const currentX = event.clientX - rect.left;
    const currentY = event.clientY - rect.top;

    switch (this.currentTool) {
      case 'pencil':
        this.drawPencil(currentX, currentY);
        break;
      case 'line':
        this.drawLine(currentX, currentY);
        break;
      case 'rectangle':
        this.drawRectangle(currentX, currentY);
        break;
      case 'circle':
        this.drawCircle(currentX, currentY);
        break;
    }
    
    // For pencil, throttle broadcasts during continuous drawing
    if (this.currentTool === 'pencil') {
      this.throttledBroadcast();
    }
  }

  private drawPencil(currentX: number, currentY: number) {
    if (!this.ctx) return;
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();
  }

  private drawLine(currentX: number, currentY: number) {
    if (!this.ctx || !this.savedImageData) return;
    this.ctx.putImageData(this.savedImageData, 0, 0);
    this.ctx.beginPath();
    this.ctx.moveTo(this.startX, this.startY);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();
  }

  private drawRectangle(currentX: number, currentY: number) {
    if (!this.ctx || !this.savedImageData) return;
    this.ctx.putImageData(this.savedImageData, 0, 0);
    const width = currentX - this.startX;
    const height = currentY - this.startY;
    this.ctx.beginPath();
    this.ctx.rect(this.startX, this.startY, width, height);
    this.ctx.stroke();
  }

  private drawCircle(currentX: number, currentY: number) {
    if (!this.ctx || !this.savedImageData) return;
    this.ctx.putImageData(this.savedImageData, 0, 0);
    const radius = Math.sqrt(
      Math.pow(currentX - this.startX, 2) + Math.pow(currentY - this.startY, 2)
    );
    this.ctx.beginPath();
    this.ctx.arc(this.startX, this.startY, radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  private stopDrawing() {
    this.isDrawing = false;
    if (this.ctx) {
      this.ctx.closePath();
      
      // Force immediate broadcast on drawing completion
      this.forceBroadcastCanvasState();
    }
  }
  
  // For throttling broadcasts during active drawing
  private throttledBroadcast() {
    const now = Date.now();
    if (now - this.lastBroadcastTime > 200) { // Max 5 broadcasts per second
      this.broadcastCanvasState();
      this.lastBroadcastTime = now;
    }
  }
  
  // Schedule a delayed broadcast (for batching)
  private scheduleBroadcast() {
    if (this.syncTimeout) {
      clearTimeout(this.syncTimeout);
    }
    
    this.syncTimeout = setTimeout(() => {
      this.broadcastCanvasState();
    }, 100);
  }
  
  // Broadcast canvas state immediately
  private forceBroadcastCanvasState() {
    if (this.canvas) {
      this.broadcastCanvasState();
    }
  }
  
  // Main method to broadcast canvas state
  private broadcastCanvasState() {
    if (this.userRole === 'client' && this.canvas) {
      try {
        const canvasData = this.canvas.toDataURL('image/png');
        console.log('Broadcasting canvas state', new Date().toISOString());
        this.canvasSharingService.broadcastCanvasData(canvasData);
      } catch (error) {
        console.error('Error broadcasting canvas state:', error);
      }
    }
  }

  setTool(tool: string) {
    this.currentTool = tool;
  }

  setStrokeColor(event: any) {
    this.strokeColor = event.target.value;
    if (this.ctx) {
      this.ctx.strokeStyle = this.strokeColor;
    }
  }

  setLineWidth(event: any) {
    this.lineWidth = parseInt(event.target.value);
    if (this.ctx) {
      this.ctx.lineWidth = this.lineWidth;
    }
  }

  saveCanvasAsImage() {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = this.canvas.toDataURL();
    link.click();
  }

  refresh() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.forceBroadcastCanvasState();
    }
  }
  
  // Add a test method
  testBroadcast() {
    // Draw something simple on the canvas for testing
    if (this.ctx) {
      this.ctx.strokeStyle = 'red';
      this.ctx.lineWidth = 5;
      this.ctx.beginPath();
      this.ctx.moveTo(50, 50);
      this.ctx.lineTo(200, 200);
      this.ctx.stroke();
      this.forceBroadcastCanvasState();
    }
  }
}