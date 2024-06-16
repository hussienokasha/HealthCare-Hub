import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Nurse } from 'src/app/Core/Models/nurse';

@Component({
  selector: 'app-nurse-dialog',
  templateUrl: './nurse-dialog.component.html',
  styleUrls: ['./nurse-dialog.component.scss'],
})
export class NurseDialogComponent {
  addNurseformGroub!: FormGroup;
  
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.addNurseformGroub = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      labName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  onSubmitForm() {}
}
