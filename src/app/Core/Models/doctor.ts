export interface Doctor {
  id: number;
  name: string;
  about: string;
  phone: string;
  fees: string;
  specialty: string;
  clinicId: number;
  shift: TimeDto[]; // Assuming TimeDto is defined similarly in TypeScript
}

export interface TimeDto {
  startTime: string; // Adjust based on the actual TimeDto structure
  endTime: string;
}
