import { Component, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Nurse } from 'src/app/Core/Models/nurse';
import { NurseService } from 'src/app/Core/Services/nurse.service';

@Component({
  selector: 'app-edit-nurse-dialog',
  templateUrl: './edit-nurse-dialog.component.html',
  styleUrls: ['./edit-nurse-dialog.component.scss'],
})
export class EditNurseDialogComponent {
  editNurseFormGroup!: FormGroup;
  nurseUpdated = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private nurseService: NurseService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public nurseData: Nurse
  ) {}

  ngOnInit() {
    this.editNurseFormGroup = this.fb.group({
      id:['',[Validators.required]],
      labId:['',[Validators.required]],
      name: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      specialty: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
     
    });
    this.editNurseFormGroup.patchValue({
      name: this.nurseData.name,
      age: this.nurseData.age,
      phone: this.nurseData.phone,
      gender: this.nurseData.gender,
      specialty: this.nurseData.specialty,
      email: this.nurseData.email,
      address: this.nurseData.address,
      labId:this.nurseData.labId,
      id:this.nurseData.id,

    });
  }

  onSubmitForm() {
    console.log(this.editNurseFormGroup)
    if (this.editNurseFormGroup.invalid) {
      this.toastr.error('Please fill in all required fields correctly.');
      return;
    }

    this.nurseService
      .editNurse(this.editNurseFormGroup.value)
      .subscribe({
        next: () => {
          this.nurseUpdated.emit();
          this.toastr.success(' Nurse Updated successfully');
        },
        error: (error) => {
          console.error(error);
          this.toastr.error('An error has occurred while adding the nurse.');
        },
      });
  }
}
