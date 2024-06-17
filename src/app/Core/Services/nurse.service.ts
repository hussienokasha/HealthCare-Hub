import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/assets/enviroment';
import { Nurse } from '../Models/nurse';
import { take, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NurseService {
  apiUrl: string = env.api;
  constructor(private http: HttpClient) {}

  getAllNurses() {
    return this.http.get<Nurse[]>(`${this.apiUrl}/Nurse/GetNurses`).pipe(
      take(1),
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }
  addNurse(nurseData: Nurse) {
    return this.http
      .post<Nurse>(`${this.apiUrl}/Nurse/Add-Nurse`, nurseData)
      .pipe(
        catchError((e) => {
          return throwError(() => e);
        })
      );
  }
  editNurse(nurseData: Nurse) {
    return this.http
      .put<Nurse>(`${this.apiUrl}/Nurse/UpdateNurse`, nurseData)
      .pipe(
        catchError((e) => {
          return throwError(() => e);
        })
      );
  }
  deleteNurse(nurseId: number) {
    let param = new HttpParams().append('NurseId', nurseId);
    return this.http
      .delete<Nurse>(`${this.apiUrl}/Nurse/Delete-Nurse`, { params: param })
      .pipe(
        catchError((e) => {
          return throwError(() => e);
        })
      );
  }
}
