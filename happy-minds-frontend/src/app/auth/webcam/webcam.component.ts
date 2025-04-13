// webcam.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as faceapi from 'face-api.js';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css'],
})
export class WebcamComponent implements OnInit {
  @Output() backgroundColorChange = new EventEmitter<string>(); // Emit background color changes
  emotion = 'neutral'; // Default emotion
  backgroundColor = '#f4f4f4'; // Default background color
  emotionStartTime: number | null = null; // Track when the emotion was first detected
  emotionDetectionActive = true; // Control emotion detection

  constructor(private sharedService:SharedService) {}

  ngOnInit() {
    this.setupWebcam();
    this.loadModels().then(() => this.detectExpressions());
  }

  async loadModels() {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/assets/models');
      console.log("Models loaded successfully");
    } catch (error) {
      console.error("Error loading models: ", error);
    }
  }

  setupWebcam() {
    const video = document.getElementById('video') as HTMLVideoElement;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
      }).catch(err => {
        console.error('Error accessing webcam:', err);
      });
    }
  }

  async detectExpressions() {
    const video = document.getElementById('video') as HTMLVideoElement;
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    const displaySize = { width: 640, height: 480 };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      if (!this.emotionDetectionActive) return;

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections.length === 0) {
        console.log("No faces detected.");
        return;
      }

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      const canvasContext = canvas.getContext('2d');
      canvasContext?.clearRect(0, 0, canvas.width, canvas.height);
      // faceapi.draw.drawDetections(canvas, resizedDetections);
      // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

      const expressions = detections[0].expressions;
      console.log("Detected Expressions: ", expressions);

      this.updateEmotion(expressions);
    }, 300);
  }

  updateEmotion(expressions: any) {
    const emotions = ['happy', 'neutral', 'sad'];
    let maxEmotion = 'neutral';
    let maxScore = expressions.neutral;

    emotions.forEach((emotion) => {
      if (expressions[emotion] > maxScore) {
        maxEmotion = emotion;
        maxScore = expressions[emotion];
      }
    });

    if (this.emotion !== maxEmotion) {
      this.emotion = maxEmotion;
      this.emotionStartTime = Date.now();
    }

    if (this.emotionStartTime && Date.now() - this.emotionStartTime >= 500) {
      this.changeBackgroundColor(maxEmotion);
      this.emotionStartTime = null;
    }

    this.sharedService.changeEmotion(this.emotion, this.backgroundColor);
  }

  changeBackgroundColor(emotion: string) {
    let newColor: string;

    switch (emotion) {
      case 'happy':
        newColor = '#add8e6'; // Light Blue for Happy
        break;
      case 'neutral':
        newColor = '#f4f4f4'; // Default neutral background color
        break;
      case 'sad':
        newColor = '#ffcccb'; // Light Red for Sad
        break;
      default:
        newColor = '#f4f4f4'; // Default to neutral
    }

    this.backgroundColor = newColor;
    this.backgroundColorChange.emit(newColor); // Emit the new background color
  }
}