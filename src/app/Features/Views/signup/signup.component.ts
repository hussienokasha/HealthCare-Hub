import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Register } from 'src/app/Core/Models/RegisterForm';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(private register: AuthService, private route: Router, private toastr: ToastrService) { }
  hide: boolean = true;
  registerFormGroup: FormGroup = new FormGroup<Register>({
    displayName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]),
    email: new FormControl('', [Validators.email, Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    phoneNumber: new FormControl('', [Validators.minLength(10), Validators.required, Validators.pattern(/^\d+$/)]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required])
  })
  onSubmitForm() {
    const date = new Date(this.registerFormGroup.value.dateOfBirth);
    date.setHours(date.getHours() + 3)
    const isoDateString = date.toISOString();
    this.registerFormGroup.patchValue({ dateOfBirth: isoDateString })
    this.register.signup(this.registerFormGroup.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toastr.success('Rigtered Successfuly');
        this.route.navigate(['/verify']);
      }, error: (e) => {
        this.toastr.error(e)
      }
    })
  }
  getErrorMessage() {
    if (this.registerFormGroup.controls['email'].value == '') {
      return 'You must enter a value';
    }

    return this.registerFormGroup.controls['email'].invalid ? 'Not a valid email' : '';
  }




}
