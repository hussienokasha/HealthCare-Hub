import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TestService } from 'src/app/Core/Services/test.service';

@Component({
  selector: 'app-test-dialog',
  templateUrl: './test-dialog.component.html',
  styleUrls: ['./test-dialog.component.scss'],
})
export class TestDialogComponent {
  selectedFile!: File;
  previewUrl: string | ArrayBuffer | null = null;
  labId!: number;
  constructor(private test: TestService, private toast: ToastrService) {}
  ngOnInit() {
    this.labId = 1;
  }
  @Output() testAdded = new EventEmitter<void>();
  testformGroup: FormGroup = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required]),
    Price: new FormControl('', [Validators.required, Validators.min(1)]),
    Image: new FormControl('', [Validators.required]),
  });

  onSubmitForm() {
    const formData = new FormData();
    formData.append('Name', this.testformGroup.get('Name')!.value);
    formData.append(
      'Description',
      this.testformGroup.get('Description')!.value
    );
    formData.append('Price', this.testformGroup.get('Price')!.value);
    formData.append('LabId', `${this.labId}`);
    formData.append('Image', this.selectedFile, this.selectedFile.name);
    this.test.addTest(formData).subscribe({
      next: (data) => {
        this.toast.success('Test Added Successfully');
        this.testAdded.emit();
      },
      error: (error) => {
        this.toast.error('an error has occured');
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
