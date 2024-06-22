import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  currentPasswordHide: boolean = true;
  newPasswordHide: boolean = true;
  confirmNewPasswordHide: boolean = true;
  loading: boolean = false;
  changePasswordForm: FormGroup;

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toaster: ToastrService
  ) {
    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl("", Validators.required),
      newPassword: new FormControl("", [Validators.required, Validators.minLength(8)]),
      confirmNewPassword: new FormControl("", [Validators.required, this.matchPasswords.bind(this)])
    });
  }

  ngOnInit(): void {
    this.changePasswordForm.controls['newPassword'].valueChanges.subscribe(() => {
      this.changePasswordForm.controls['confirmNewPassword'].updateValueAndValidity();
    });
  }

  matchPasswords(control: FormControl): { [s: string]: boolean } | null {
    const parent = control.parent;
    return control.value === parent?.get('newPassword')?.value ? null : { notMatched: true };
  }

  onFormSubmit(changePasswordForm: FormGroup): void {
    if (this.changePasswordForm.valid) {
      this.loading = true;
      this._AuthService.changePassword(changePasswordForm.value).subscribe({
        next: (value: any) => {
          this.loading = false;
          this.toaster.success('Password changed successfully.');
          this._Router.navigate(['/home']);
        },
        error: (error: any) => {
          this.loading = false;
          this.toaster.error('Failed to change password. Please try again.');
        }
      });
    } else {
      this.toaster.error('Please fill in all required fields correctly.');
    }
  }
}
