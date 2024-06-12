import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Core/Models/User';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-profile-sitting',
  templateUrl: './profile-sitting.component.html',
  styleUrls: ['./profile-sitting.component.scss']
})
export class ProfileSittingComponent implements OnInit {
  userObj!: User | undefined;
  selectedFile!: File;
  previewUrl: string | ArrayBuffer | null = null;
  curhide: boolean = false;
  nhide: boolean = false;
  conhide: boolean = false;

  profileForm: FormGroup = new FormGroup({
    DisplayName: new FormControl(''),
    Height: new FormControl(''),
    Weight: new FormControl(''),
    Image: new FormControl(''),
    BloodType: new FormControl(''),
  });

  changePassForm: FormGroup = new FormGroup({
    currentPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  }, { validators: this.PasswordMatchValidator });

  constructor(
    private changePass: AuthService,
    private toast: ToastrService,
  ) { }

  ngOnInit() {

    this.changePass.getUserData().subscribe({
      next: (data: any) => {
        console.log(data)
        this.userObj = data;
        this.profileForm.setValue({
          DisplayName: this.userObj!.displayName,
          Height: this.userObj!.height,
          Weight: this.userObj!.weight,
          Image: this.userObj!.pictureUrl,
          BloodType: this.userObj!.bloodType,
        })

      },
      error: (e) => {
        console.log(e);
      }
    });

  }

  onSubmitProfile() {
    if (this.profileForm.dirty) {
      let formData = new FormData();
      formData.append('DisplayName', this.profileForm.get('DisplayName')!.value);
      formData.append('Height', this.profileForm.get('Height')!.value);
      formData.append('Weight', this.profileForm.get('Weight')!.value);
      if (this.selectedFile) {
        formData.append('Image', this.selectedFile, this.selectedFile.name);
      }
      formData.append('BloodType', this.profileForm.get('BloodType')!.value);
      this.changePass.updateUserinfo(formData).subscribe({
        next: (res: any) => {
          console.log(res);
          this.toast.success('Profile Updated Successfully');
          window.location.reload();
        },
        error: (err) => {
          this.toast.error(err);
        }
      });
      
    }
  }

  changePassword() {
    if (this.changePassForm.valid) {
      this.changePass.changePassword(this.changePassForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.toast.success('Password Changed Successfully');
        },
        error: (err) => {
          this.toast.error('An error has occurred');
          console.log(err);
        }
      });
    }
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.previewUrl = null;
    }
  }

  PasswordMatchValidator(formGroup: any) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }
}
