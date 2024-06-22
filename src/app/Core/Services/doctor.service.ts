import { Injectable } from '@angular/core';
import { take, catchError, throwError, Subject, BehaviorSubject } from 'rxjs';
import { env } from 'src/assets/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Doctor } from '../Models/doctor';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  apiUrl: string = env.api;
  constructor(private http: HttpClient) {}
  getAllDoctors() {
    return this.http
      .get<Doctor[]>(`${this.apiUrl}/Doctor/Get-All-Doctors`)
      .pipe(
        take(1),
        catchError((e) => {
          return throwError(() => e);
        })
      );
  }
  addDoctor(formData: FormData) {
    return this.http.post(`${this.apiUrl}/Doctor/Add-Doctor`, formData).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }
  deleteDoctor(doctorId: number) {
    let param = new HttpParams().append('id', doctorId);
    return this.http
      .delete(`${this.apiUrl}/Doctor/Delete-Doctor`, { params: param })
      .pipe(
        catchError((e) => {
          return throwError(() => e);
        })
      );
  }
  getDoctorById(doctorId: number) {
    let param = new HttpParams().append('Id', doctorId);
    return this.http
      .get<Doctor>(`${this.apiUrl}/Doctor/Get-Doctor-By-Id`, { params: param })
      .pipe(
        take(1),
        catchError((e) => {
          return throwError(() => e);
        })
      );
  }
  editDoctor(formData: FormData) {
    return this.http.put(`${this.apiUrl}/Doctor/UpdateDoctor`, formData).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }
}
