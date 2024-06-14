import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/Core/Services/doctor.service';

@Component({
  selector: 'app-edit-doctor-dialog',
  templateUrl: './edit-doctor-dialog.component.html',
  styleUrls: ['./edit-doctor-dialog.component.scss']
})
export class EditDoctorDialogComponent {
  @Output() doctorUpdated = new EventEmitter<void>();
  editDoctorformGroup!: FormGroup;
  selectedFile!: File;
  previewUrl: string | ArrayBuffer | null = null;
  constructor(private fb: FormBuilder,private doctor:DoctorService,private toast:ToastrService) { }
  ngOnInit() {
    
    this.editDoctorformGroup = this.fb.group({
      name: ['', [Validators.required]],
      about: ['', [Validators.required]],
      fees: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      specialty: ['', [Validators.required]],
      image: ['',],
    })
    
  }

  onSubmitForm() {
    const formData = new FormData();
    formData.append('Name',this.editDoctorformGroup.value.name);
    formData.append('About',this.editDoctorformGroup.value.about);
    formData.append('Fees',this.editDoctorformGroup.value.fees);
    formData.append('Phone',this.editDoctorformGroup.value.phone);
    formData.append('Specialty',this.editDoctorformGroup.value.specialty);
    formData.append('Image',this.selectedFile,this.selectedFile.name);
    this.doctor.addDoctor(formData).subscribe({
      next: (res: any) => {
        this.toast.success('Doctor Edit Successfully');
        this.doctorUpdated.emit();
        console.log(res)
        },
        error: (err: any) => {
        console.log(err)
        this.toast.error(err.error.message);
      },

    })
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
