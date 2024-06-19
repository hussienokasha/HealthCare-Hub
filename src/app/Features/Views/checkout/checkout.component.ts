import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'src/app/success-dialog/success-dialog.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class CheckoutComponent implements OnInit {
  totalPrice: number = 0;
  checkoutForm!: FormGroup;

  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // subscribe to the total price observable
    this.sharedService.currentTotalPrice.subscribe((price) => {
      this.totalPrice = price;
    });

    // initialize the form with validators
    this.checkoutForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^[a-zA-Z ]*$/),
        ],
      ],
      country: ['', Validators.required],
      address: ['', Validators.required],
      cardNumber: [
        '',
        [Validators.required, Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)],
      ],
      // expirationDate: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]],
      expirationDate: ['', [Validators.required, this.expirationDateValidator]],

      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    });
  }

  expirationDateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const [month, year] = value.split('/');
    const monthNum = parseInt(month, 10);

    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      return { invalidMonth: true };
    }

    return null;
  }
  onSubmit() {
    if (this.checkoutForm.valid) {
      // Open success dialog
      const dialogRef = this.dialog.open(SuccessDialogComponent);

      // After dialog is closed, clear the cart and redirect to homepage
      dialogRef.afterClosed().subscribe(() => {
        // Clear the cart
        localStorage.removeItem('testCart');
        localStorage.removeItem('medCart');
        this.sharedService.updateTotalPrice(0);

        // Redirect to homepage
        // this.router.navigate(['/']);

        // Redirect to cart page
        this.router.navigate(['/cart']);
      });
    } else {
      console.log('Form is not valid');
      this.checkoutForm.markAllAsTouched(); // Mark all controls as touched to display validation errors
    }
  }
}
