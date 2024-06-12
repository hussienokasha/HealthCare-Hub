import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/Services/auth.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private route: ActivatedRoute,
    private _Router: Router,
    private toast: ToastrService
  ) { }

  hide: boolean = true;
  hideConfirm: boolean = true;
  loading: boolean = false;
  resetPasswordForm!: FormGroup;

  ngOnInit(): void {
    const email = this.route.snapshot.queryParamMap.get('email');
    const encodedToken = this.route.snapshot.queryParamMap.get('token') ?? '';

    this.resetPasswordForm = new FormGroup({
      Email: new FormControl(email, Validators.required),
      NewPassword: new FormControl("", [Validators.required, Validators.maxLength(30), Validators.minLength(8)]),
      ConfirmPassword: new FormControl("", [Validators.required, this.matchPasswords.bind(this)]),
      Token: new FormControl(encodedToken, [Validators.required])
    });

    this.resetPasswordForm.controls['NewPassword'].valueChanges.subscribe(() => {
      this.resetPasswordForm.controls['ConfirmPassword'].updateValueAndValidity();
    });
  }

  matchPasswords(control: FormControl): { [s: string]: boolean } | null {
    const parent = control.parent;
    return control.value === parent?.get('NewPassword')?.value ? null : { notMatched: true };
  }

  onResetPasswordSubmit(resetPasswordForm: FormGroup) {
    this.loading = true;
    this._AuthService.resetPassword(resetPasswordForm.value).subscribe({
      next: (value) => {
        console.log(value);
        this.toast.success('Password Reset Successfully');
        this.loading = false;
        this._Router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err)
        this.toast.error(err);
      },
    });
  }
}
