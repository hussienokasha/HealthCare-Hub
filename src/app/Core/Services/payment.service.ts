import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  stripePromise = loadStripe(
    'pk_test_51PUvLmRwM399IrYtbn0HNF7fYcwiRJMZJvVNo1XioIWkpKxlFanyWy8CdkB2va2tcvHIpd8yl337xW76Ya0LpHAW00OZwZclLA'
  );
  constructor() {}
  async createPaymentMethod(cardElement: any) {
    const stripe = await this.stripePromise;
    const { error, paymentMethod } = await stripe!.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    if (error) {
      console.error(error);
      return error;
    } else {
      return paymentMethod;
    }
  }

  async confirmPayment(paymentIntentId: any) {
    const stripe = await this.stripePromise;
    const { error, paymentIntent } = await stripe!.confirmCardPayment(
      paymentIntentId
    );
    if (error) {
      return error;
      console.error(error);
    } else {
      return paymentIntent;
    }
  }
}
