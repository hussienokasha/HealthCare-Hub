import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take, throwError } from 'rxjs';
import { env } from 'src/assets/enviroment';
import { Medicine } from '../Models/medicine';


@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  apiUrl: string = env.api;
  constructor(private http: HttpClient) { }
  getAllMedicines() {
    return this.http.get<Medicine[]>(`${this.apiUrl}/Medicine/Get-All-Medicines`).pipe(take(1), catchError(e =>
      throwError(() => {
        return e;
      })));
  }
  addMedicine(formData: FormData) {
    return this.http.post<Medicine>(`${this.apiUrl}/Medicine/Add-Medicine`, formData).pipe(catchError(e =>
      throwError(() => {
        return e;
      })));
  }
  editMedicine(formData: FormData) {
    return this.http.post(`${this.apiUrl}/Medicine/edit-Medicine`, formData).pipe(catchError(e =>
      throwError(() => {
        return e;
      })));
  }
  deleteMedicine(mId: number) {
    let param = new HttpParams().append('id', mId);
    return this.http.delete(`${this.apiUrl}/Medicine/Delete-Medicine`, { params: param }).pipe(catchError(e =>
      throwError(() => {
        return e;
      })));
  }
  getMedicineById(id:number){
    let param = new HttpParams().append('id', id);
    return this.http.get<Medicine>(`${this.apiUrl}/Medicine/Get-Medicine-By-Id`, { params: param }).pipe(take(1),catchError(e =>
      throwError(() => {
        return e;
      })));
  }

}