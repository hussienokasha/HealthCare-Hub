import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Login } from 'src/app/Core/Models/LoginForm';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {


  constructor(private login: AuthService, private toast: ToastrService, private router: Router) { }
  hide: boolean = true;
  loginFormGroup: FormGroup = new FormGroup<Login>({
    email: new FormControl('', [Validators.email, Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    password: new FormControl('', [Validators.minLength(8), Validators.required])
  })

  onSubmitForm() {
    this.login.login(this.loginFormGroup.value).subscribe({
      next: (data: any) => {
        this.toast.success('Login Successfully');
      }, error: (err) => {
        if (err == 'User Account not activated') {
          this.router.navigate(['/verify'])
        }
        this.toast.error(err);
      }
    })
  }

  getErrorMessage() {
    if (this.loginFormGroup.controls['email'].value == '') {
      return 'You must enter a value';
    }

    return this.loginFormGroup.controls['email'].invalid ? 'Not a valid email' : '';
  }
}