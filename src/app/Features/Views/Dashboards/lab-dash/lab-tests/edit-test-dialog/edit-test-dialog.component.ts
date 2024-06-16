import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Test } from 'src/app/Core/Models/test';
import { TestService } from 'src/app/Core/Services/test.service';

@Component({
  selector: 'app-edit-test-dialog',
  templateUrl: './edit-test-dialog.component.html',
  styleUrls: ['./edit-test-dialog.component.scss'],
})
export class EditTestDialogComponent {
  selectedFile!: File;
  previewUrl: string | ArrayBuffer | null = null;
  @Output() testEdited = new EventEmitter<void>();
  constructor(
    private test: TestService,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public testData: Test
  ) {}
  ngOnInit() {
    this.testformGroup.patchValue({
      Name: this.testData.name,
      Description: this.testData.description,
      Price: this.testData.price,
    });
  }

  testformGroup: FormGroup = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required]),
    Price: new FormControl('', [Validators.required, Validators.min(1)]),
    Image: new FormControl(''),
  });

  onSubmitForm() {
    const formData = new FormData();
    formData.append('Name', this.testformGroup.get('Name')!.value);
    formData.append('Id', `${this.testData.id}`);
    formData.append(
      'Description',
      this.testformGroup.get('Description')!.value
    );
    formData.append('Price', this.testformGroup.get('Price')!.value);
    formData.append('LabId', `${this.testData.lab?.id}`);
    if (this.selectedFile) {
      formData.append('Image', this.selectedFile, this.selectedFile.name);
    }

    this.test.editTest(formData).subscribe({
      next: () => {
        this.toast.success('Test Updated Successfully');
        this.testEdited.emit();
      },
      error: (error) => {
        this.toast.error('an error has occured');
        console.log(error);
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
