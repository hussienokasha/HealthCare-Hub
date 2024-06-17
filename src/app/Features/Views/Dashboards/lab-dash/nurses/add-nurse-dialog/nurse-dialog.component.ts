import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NurseService } from 'src/app/Core/Services/nurse.service';

@Component({
  selector: 'app-nurse-dialog',
  templateUrl: './nurse-dialog.component.html',
  styleUrls: ['./nurse-dialog.component.scss'],
})
export class NurseDialogComponent implements OnInit {
  addNurseFormGroup!: FormGroup;
  NurseAdded = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private nurseService: NurseService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.addNurseFormGroup = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      specialty: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      labId: [1] 
    });
  }

  onSubmitForm() {
    if (this.addNurseFormGroup.invalid) {
      this.toastr.error('Please fill in all required fields correctly.');
      return;
    }

    this.nurseService.addNurse(this.addNurseFormGroup.value).subscribe({
      next: () => {
        this.NurseAdded.emit();
        this.toastr.success('New Nurse added successfully');
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('An error has occurred while adding the nurse.');
      }
    });
  }
}
