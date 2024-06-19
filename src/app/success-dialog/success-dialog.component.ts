import { Component } from '@angular/core';

@Component({
  selector: 'app-success-dialog',
  template: `
  <div class="box bg-success alret alert-success">
    <h1 mat-dialog-title>Payment Successful</h1>
    <div mat-dialog-content>
      <p class="text-white">Your payment was successful. Thank you for your purchase!</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>

  </div>
  `,
  styles: [`
  .box{
    // background-color:green;
  }
   
  `]
})
export class SuccessDialogComponent {}
