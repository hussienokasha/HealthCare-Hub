import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/Core/Services/doctor.service';

@Component({
  selector: 'app-add-doctor-dialog',
  templateUrl: './add-doctor-dialog.component.html',
  styleUrls: ['./add-doctor-dialog.component.scss']
})
export class AddDoctorDialogComponent {
  @Output() doctorAdded = new EventEmitter<void>();
  addDoctorformGroup!: FormGroup;
  selectedFile!: File;
  previewUrl: string | ArrayBuffer | null = null;
  constructor(private fb: FormBuilder,private doctor:DoctorService,private toast:ToastrService) { }
  ngOnInit() {
    this.addDoctorformGroup = this.fb.group({
      name: ['', [Validators.required]],
      about: ['', [Validators.required]],
      fees: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      specialty: ['', [Validators.required]],
      image: ['', [Validators.required]],
    })
    
  }

  onSubmitForm() {
    const formData = new FormData();
    formData.append('Name',this.addDoctorformGroup.value.name);
    formData.append('About',this.addDoctorformGroup.value.about);
    formData.append('Fees',this.addDoctorformGroup.value.fees);
    formData.append('Phone',this.addDoctorformGroup.value.phone);
    formData.append('Specialty',this.addDoctorformGroup.value.specialty);
    formData.append('Image',this.selectedFile,this.selectedFile.name);
    this.doctor.addDoctor(formData).subscribe({
      next: (res: any) => {
        this.toast.success('Doctor Added Successfully');
        this.doctorAdded.emit();
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
