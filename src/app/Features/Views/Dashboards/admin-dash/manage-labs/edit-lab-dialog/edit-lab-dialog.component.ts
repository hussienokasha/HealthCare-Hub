import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Lab } from 'src/app/Core/Models/lab';
import { LabService } from 'src/app/Core/Services/lab.service';

@Component({
  selector: 'app-edit-lab-dialog',
  templateUrl: './edit-lab-dialog.component.html',
  styleUrls: ['./edit-lab-dialog.component.scss'],
})
export class EditLabDialogComponent {
  editLabformGroup!: FormGroup;
  selectedFile!: File;
  previewUrl: string | ArrayBuffer | null = null;
  @Output() labUpdated = new EventEmitter<void>();
  constructor(
    private fb: FormBuilder,
    private lab: LabService,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public labData: Lab
  ) {}
  ngOnInit() {
    this.editLabformGroup = this.fb.group({
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      image: [''],
    });
    this.editLabformGroup.patchValue({
      name: this.labData.name,
      location: this.labData.location,
      phone: this.labData.phone,
      email: this.labData.email,
      description: this.labData.description,
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
  onSubmitForm() {
    const formData = new FormData();
    formData.append('Id', `${this.labData.id}`);
    formData.append('Name', this.editLabformGroup.value.name);
    formData.append('Description', this.editLabformGroup.value.description);
    formData.append('Location', this.editLabformGroup.value.location);
    formData.append('Phone', this.editLabformGroup.value.phone);
    formData.append('Email', this.editLabformGroup.value.email);
    if (this.selectedFile) {
      formData.append('Image', this.selectedFile, this.selectedFile.name);
    }
    this.lab.updateLab(formData).subscribe({
      next: (d) => {
        this.toast.success('Lab Updated Successfully');
        this.labUpdated.emit();
        console.log(d);
      },
      error: (e) => {
        console.log(e);
        this.toast.error(e);
      },
    });
  }
}
