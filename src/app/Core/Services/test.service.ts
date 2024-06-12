import { Injectable } from '@angular/core';
import { take, catchError, throwError } from 'rxjs';
import { Test } from '../Models/test';
import { HttpClient, HttpParams } from '@angular/common/http';
import { env } from 'src/assets/enviroment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  apiUrl: string = env.api;
  constructor(private http: HttpClient) { }
  getAllTests() {
    return this.http.get<Test[]>(`${this.apiUrl}/Test/GetTests`).pipe(take(1), catchError(e => {
      return throwError(() => e)
    }))
  }
  addTest(formData: FormData) {
    return this.http.post(`${this.apiUrl}/Test/Add-Test`, formData).pipe(catchError(e => {
      return throwError(() => e)
    }));
  }
  editTest(formData: FormData) {
    return this.http.post(`${this.apiUrl}/Test/UpdateTest`, formData).pipe(catchError(e => {
      return throwError(() => e)
    }));
  }
  deleteTest(testId: number) {
    let param = new HttpParams().append('id', testId)
    return this.http.delete(`${this.apiUrl}/Test/DeleteTest`, { params: param }).pipe(catchError(e => {
      return throwError(() => e)
    }));
  }
  getTestById(testId: number) {
    let param = new HttpParams().append('Id', testId)
    return this.http.get<Test>(`${this.apiUrl}/Test/Get-Test-By-Id`, { params: param }).pipe(catchError(e => {
      return throwError(() => e)
    }));
  }
}
