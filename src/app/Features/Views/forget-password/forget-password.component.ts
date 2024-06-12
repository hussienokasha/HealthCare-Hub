import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  constructor(private forgetPass: AuthService, private toast: ToastrService) { }
  email = new FormControl('', [Validators.email, Validators.required])
  onSubmitForm() {
    console.log(this.email)
    this.forgetPass.forgotPassword(this.email.value!).subscribe({
      next: (data) => {
        console.log(data)
        this.toast.success('Check Your Malebox')
      }, error: (err) => {
        console.log(err)
        this.toast.error(err)
      }
    })
  }
}
