import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, catchError, throwError } from 'rxjs';
import { env } from 'src/assets/enviroment';
import { Lab } from '../Models/lab';

@Injectable({
  providedIn: 'root',
})
export class LabService {
  private apiUrl: string = env.api;
  constructor(private http: HttpClient) {}

  getAllLabs() {
    return this.http.get<Lab[]>(`${this.apiUrl}/Lab/GetLabs`).pipe(
      take(1),
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }
  addLab(formData: FormData) {
    return this.http.post(`${this.apiUrl}/Lab/Add-Lab`, formData).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }
  deleteLab(labId: number) {
    let param = new HttpParams().append('id', labId);
    return this.http
      .delete(`${this.apiUrl}/Lab/Delete-Lab`, { params: param })
      .pipe(
        catchError((e) => {
          return throwError(() => e);
        })
      );
  }
  updateLab(formData: FormData) {
    return this.http.put(`${this.apiUrl}/Lab/UpdateLab`, formData).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }
}
