export interface ReturnClinicDto {
  id: number;
  name: string;
}

export interface ReturnDoctorDto {
  id: number;
  name: string;
  about: string;
  phone: string;
  email: string;
  fees: string;
  specialty: string;
  clinicId: number;
  shift: Shift[];
}

export interface Shift {
  startTime: string;
  endTime: string;
}

export interface ReturnClinicWithDoctorsDto {
  id: number;
  name: string;
  doctorDto: ReturnDoctorDto[];
}

export interface AddClinicDto {
  name: string;
}
