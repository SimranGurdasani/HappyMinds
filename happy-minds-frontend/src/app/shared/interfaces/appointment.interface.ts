export interface Appointment {
    id: number;
    therapistName: string;
    dateTime: Date;
    slotTaken: boolean;
    activityCompleted: boolean;
    prescriptionUrl?: string;
  }