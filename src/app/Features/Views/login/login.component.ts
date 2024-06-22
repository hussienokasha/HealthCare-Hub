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

  constructor(private _AuthService:AuthService, private _Router:Router,    
    private toastr: ToastrService,
    ){}
  ngOnInit(): void {
    
  }
  hide:boolean = true;
  message:string="";
  loading:boolean =false;
  login:FormGroup= new FormGroup({
    email:new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(30)]),
  })
  onLoginSubmit() {
    this.loading = true;
    if (this.login.valid) {
      this._AuthService.login(this.login.value).subscribe({
        next: (value) => {
          localStorage.setItem('token', value.token);
          this.toastr.success('Logged in successfully!', 'Success');
          this._Router.navigate(['/home']);
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Error');
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
    } else {
      this.toastr.warning('Please fill in all required fields.', 'Warning');
    }
  }


}