import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from 'src/assets/enviroment';
import { AddClinicDto, ReturnClinicDto } from '../Models/clinic';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  private apiUrl: string = env.api;

  constructor(private http: HttpClient) {}
  getAllClinics(): Observable<ReturnClinicDto[]> {
    return this.http.get<ReturnClinicDto[]>(`${this.apiUrl}/Clinic/Get-All-Clinics`);
  }

  addClinic(addClinicDto: AddClinicDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Clinic/Add-Clinic`, addClinicDto);
  }

  deleteClinic(clinicId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Clinic/Delete-Clinic?ClinicId=${clinicId}`);
  }

  getClinicById(id: number): Observable<ReturnClinicDto> {
    return this.http.get<ReturnClinicDto>(`${this.apiUrl}/Clinic/Get-Clinic-By-Id?Id=${id}`);
  }
  getDoctorsByClinicId(clinicId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Doctor/Get-Doctors-By-ClinicId?ClinicId=${clinicId}`);
  }
}
