// src/app/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/Core/Models/medicine';
import { Test } from 'src/app/Core/Models/test';
import { SharedService } from 'src/app/shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  testCart: Test[] = [];
  medCart: Medicine[] = [];
<<<<<<< HEAD

  constructor(private sharedService: SharedService) {}

=======
selectedOption: string = 'home';
selectedMethod: string = 'visa';
>>>>>>> 88d50ec05f0497f11f0a060fc9060089f75fca8f
  ngOnInit(): void {
    this.getTests();
    this.getMedicines();
    this.updateTotalPrice();
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
    this.updateTotalPrice();
  }

  removeMed(medId: number) {
    let cart: Medicine[] = JSON.parse(localStorage.getItem('medCart') || '[]');
    cart = cart.filter((item: any) => item.id != medId);
    localStorage.setItem('medCart', JSON.stringify(cart));
    this.getMedicines();
    this.updateTotalPrice();
  }

  updateTotalPrice() {
    const totalPrice = this.calculateTotalPrice();
    this.sharedService.updateTotalPrice(totalPrice);
    localStorage.setItem('totalPrice', totalPrice.toString());
  }

  calculateTotalPrice(): number {
    let testCart: Test[] = JSON.parse(localStorage.getItem('testCart') || '[]');
    let medCart: Medicine[] = JSON.parse(localStorage.getItem('medCart') || '[]');
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