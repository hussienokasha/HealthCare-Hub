import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LabService } from 'src/app/Core/Services/lab.service';

@Component({
  selector: 'app-edit-lab-dialog',
  templateUrl: './edit-lab-dialog.component.html',
  styleUrls: ['./edit-lab-dialog.component.scss']
})
export class EditLabDialogComponent {
  editLabformGroup!: FormGroup;
  selectedFile!: File;
  previewUrl: string | ArrayBuffer | null = null;
  @Output() labUpdated = new EventEmitter<void>();
  constructor(private fb: FormBuilder, private lab: LabService, private toast:ToastrService) { }
  ngOnInit() {
    this.editLabformGroup = this.fb.group({
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
      phone: ['', [Validators.required,Validators.minLength(11)]],
      email: ['', [Validators.required,Validators.email]],
      image: ['',],
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
  onSubmitForm() {
    const formData = new FormData();
    formData.append('Name', this.editLabformGroup.value.name);
    formData.append('Location', this.editLabformGroup.value.location);
    formData.append('Phone', this.editLabformGroup.value.phone);
    formData.append('Email', this.editLabformGroup.value.email);
    formData.append('Image', this.selectedFile, this.selectedFile.name);
    this.lab.addLab(formData).subscribe({
      next:(d)=>{
        this.toast.success('Lab Added Successfully');
        this.labUpdated.emit();
        console.log(d)
      },error:(e)=>{
        console.log(e)
        this.toast.error(e.error.message);
      }
    })

  }


}
