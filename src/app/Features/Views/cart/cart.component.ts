import { Component } from '@angular/core';
import { Test } from 'src/app/Core/Models/test';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cart!: Test[];
  ngOnInit(): void {
    this.getTests();
  }
  getTests() {
    let loc = localStorage.getItem('testCart');
    if (loc) {
      this.cart = JSON.parse(loc);
    }
  }

  removeFromLocal(testId: number | undefined) {
    let cart = JSON.parse(localStorage.getItem('testCart') || '');
    cart = cart.filter((item: any) => item.id != testId)
    localStorage.setItem('testCart',JSON.stringify(cart));
    this.getTests();
    this.getTotalPrice()
  }
  getTotalPrice(){
    let cart = JSON.parse(localStorage.getItem('testCart') || '');
    let total = 0;
    cart.forEach((item: any) => {
      total += item.price;
    });
    return total;
  }
}
