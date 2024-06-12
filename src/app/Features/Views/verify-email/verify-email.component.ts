import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VerEmail } from 'src/app/Core/Models/EmailVerify';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {
  constructor(private verify: AuthService, private route: Router, private toast: ToastrService) { }
  verifyForfmGroup: FormGroup = new FormGroup<VerEmail>({
    Email: new FormControl('', Validators.required),
    VerificationCode: new FormControl('', Validators.required)
  })
  onSubmitForm() {
    this.verify.verifyEmail(this.verifyForfmGroup.value).subscribe({
      next: (data: any) => {
        this.toast.success('Email Verified Successfully')
        this.route.navigate(['/login'])

      }, error: (err) => {
        console.log(err)
        this.toast.error(err);
        if (err == 'This Email Already Verified'){
          this.route.navigate(['/login'])
        }
      }
    })
  }
}
