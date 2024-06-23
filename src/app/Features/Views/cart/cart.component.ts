import { Component, ElementRef, ViewChild } from '@angular/core';
import { Medicine } from 'src/app/Core/Models/medicine';
import { Test } from 'src/app/Core/Models/test';
import { PaymentService } from 'src/app/Core/Services/payment.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  handler: any = null;

  testCart: Test[] = [];
  medCart: Medicine[] = [];
  constructor() {}
  ngOnInit(): void {
    this.loadStripe();
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
  pay(amount: any) {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51PUvLmRwM399IrYtbn0HNF7fYcwiRJMZJvVNo1XioIWkpKxlFanyWy8CdkB2va2tcvHIpd8yl337xW76Ya0LpHAW00OZwZclLA',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token);
        alert('Token Created!!');
      },
    });

    handler.open({
      name: 'Healthcare payment',
      description: 'add your info',
      amount: amount * 100,
    });
  }
  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51PUvLmRwM399IrYtbn0HNF7fYcwiRJMZJvVNo1XioIWkpKxlFanyWy8CdkB2va2tcvHIpd8yl337xW76Ya0LpHAW00OZwZclLA',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token);
            alert('Payment Success!!');
          },
        });
      };

      window.document.body.appendChild(s);
    }
  }
}
