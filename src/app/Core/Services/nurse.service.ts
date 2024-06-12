import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/assets/enviroment';
import { Nurse } from '../Models/nurse';
import { take, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NurseService {
  apiUrl: string = env.api;
  constructor(private http: HttpClient) { }

  getAllNurses() {
    return this.http.get<Nurse[]>(`${this.apiUrl}/Nurse/GetNurses`).pipe(take(1), catchError(e => {
      return throwError(() => e)
    }))
  }
  addNurse(nurseData: Nurse) {
    return this.http.post<Nurse>(`${this.apiUrl}/Lab/Add-Nurse`, nurseData).pipe(catchError(e => {
      return throwError(() => e)
    }))
  }
  editNurse(nurseData: Nurse, nurseId: number) {
    let param = new HttpParams().append('id', nurseId)
    return this.http.post<Nurse>(`${this.apiUrl}/Lab/Edit-Nurse`, nurseData, { params: param }).pipe(catchError(e => {
      return throwError(() => e)
    }))
  }
  deleteNurse(nurseId: number) {
    let param = new HttpParams().append('id', nurseId)
    return this.http.delete<Nurse>(`${this.apiUrl}/Lab/delete-Nurse`, { params: param }).pipe(catchError(e => {
      return throwError(() => e)
    }))
  }
}
