import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false); // Initial loading state is false
  loading = this.loadingSubject.asObservable();

  constructor() { }

  setLoading(isLoading: boolean): void {
    this.loadingSubject.next(isLoading);
  }

  isLoading(): boolean {
    return this.loadingSubject.value;
  }
}
