import { Component } from '@angular/core';
import { Medicine } from 'src/app/Core/Models/medicine';
import { Test } from 'src/app/Core/Models/test';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  testCart: Test[] = [];
  medCart: Medicine[] = [];
selectedOption: string = 'home';

  ngOnInit(): void {
    this.getTests();
    this.getMedicines();
  }
  getTests() {
    let loc = localStorage.getItem('testCart');
    if (loc) {
      this.testCart = JSON.parse(loc);
    }
  }
  getMedicines() {
    let loc = localStorage.getItem('medCart');
    if (loc) {
      this.medCart = JSON.parse(loc);
    }
  }

  removeTest(testId: number) {
    let cart: Test[] = JSON.parse(localStorage.getItem('testCart') || '[]');
    cart = cart.filter((item: any) => item.id != testId);
    localStorage.setItem('testCart', JSON.stringify(cart));
    this.getTests();
    this.getTotalPrice();
  }
  removeMed(medId: number) {
    let cart: Medicine[] = JSON.parse(localStorage.getItem('medCart') || '[]');
    cart = cart.filter((item: any) => item.id != medId);
    localStorage.setItem('medCart', JSON.stringify(cart));
    this.getMedicines();
    this.getTotalPrice();
  }

  getTotalPrice() {
    let testCart: Test[] = JSON.parse(localStorage.getItem('testCart') || '[]');
    let medCart: Medicine[] = JSON.parse(
      localStorage.getItem('medCart') || '[]'
    );
    let testTotal = 0;
    let medTotal = 0;
    testCart.forEach((item: any) => {
      testTotal += item.price;
    });
    medCart.forEach((item: any) => {
      medTotal += item.price;
    });
    return testTotal + medTotal;
  }
}
