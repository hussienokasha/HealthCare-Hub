import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  loading: boolean = false;
  forgetPassword!: FormGroup;

  constructor(
    private _AuthService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.forgetPassword = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }

  onForgetPasswordSubmit(): void {
    this.loading = true;
    this._AuthService.forgotPassword(this.forgetPassword.value).subscribe({
      next: (value) => {
        this.toastr.success('Success! Email sent. Please check your inbox.', 'Success');
        this.loading = false;
      },
      error: (err) => {
        if (err.status == 500) {
          this.toastr.error('Internal Server error, please try again later', 'Error');
        } else {
          this.toastr.error('Email does not exist', 'Error');
        }
        this.loading = false;
      },
    });
  }
}
