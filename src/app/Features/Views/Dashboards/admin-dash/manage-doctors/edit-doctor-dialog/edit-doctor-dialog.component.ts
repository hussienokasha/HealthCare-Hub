import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Doctor } from 'src/app/Core/Models/doctor';
import { DoctorService } from 'src/app/Core/Services/doctor.service';

@Component({
  selector: 'app-edit-doctor-dialog',
  templateUrl: './edit-doctor-dialog.component.html',
  styleUrls: ['./edit-doctor-dialog.component.scss'],
})
export class EditDoctorDialogComponent {
  @Output() doctorUpdated = new EventEmitter<void>();
  editDoctorformGroup!: FormGroup;
  selectedFile!: any;
  previewUrl: string | ArrayBuffer | null = null;
  constructor(
    private fb: FormBuilder,
    private doctor: DoctorService,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public doctorData: Doctor
  ) {}
  ngOnInit() {
    console.log(this.doctorData);
    this.editDoctorformGroup = this.fb.group({
      name: ['', [Validators.required]],
      about: ['', [Validators.required]],
      fees: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      specialty: ['', [Validators.required]],
      image: [''],
    });
    this.editDoctorformGroup.patchValue({
      name: this.doctorData.name,
      about: this.doctorData.about,
      fees: this.doctorData.fees,
      phone: this.doctorData.phone,
      specialty: this.doctorData.specialty,
    });
  }

  onSubmitForm() {
    const formData = new FormData();
    formData.append('Name', this.editDoctorformGroup.value.name);
    formData.append('About', this.editDoctorformGroup.value.about);
    formData.append('Fees', this.editDoctorformGroup.value.fees);
    formData.append('Phone', this.editDoctorformGroup.value.phone);
    formData.append('Specialty', this.editDoctorformGroup.value.specialty);
    formData.append('Id', `${this.doctorData.id}`);
    if (this.selectedFile) {
      formData.append('Image', this.selectedFile, this.selectedFile.name);
    }

    this.doctor.editDoctor(formData).subscribe({
      next: (res: any) => {
        this.toast.success('Doctor Updated Successfully');
        this.doctorUpdated.emit();
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
        this.toast.error(err.error.message);
      },
    });
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
}
