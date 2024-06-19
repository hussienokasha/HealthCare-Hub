import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private totalPriceSource = new BehaviorSubject<number>(this.getInitialTotalPrice());
  currentTotalPrice = this.totalPriceSource.asObservable();

  constructor() {}

  updateTotalPrice(price: number) {
    this.totalPriceSource.next(price);
  }

  private getInitialTotalPrice(): number {
    const savedTotalPrice = localStorage.getItem('totalPrice');
    return savedTotalPrice ? parseFloat(savedTotalPrice) : 0;
  }
}
