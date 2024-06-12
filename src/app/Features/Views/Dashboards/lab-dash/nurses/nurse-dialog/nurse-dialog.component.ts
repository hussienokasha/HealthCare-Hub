import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Nurse } from 'src/app/Core/Models/nurse';

@Component({
  selector: 'app-nurse-dialog',
  templateUrl: './nurse-dialog.component.html',
  styleUrls: ['./nurse-dialog.component.scss']
})
export class NurseDialogComponent {

  constructor() { }
  formGroub: FormGroup = new FormGroup({
    nurseName: new FormControl('',),
    age: new FormControl('',),
    gender: new FormControl('',),
    labName: new FormControl('',),
    phone: new FormControl('',),
    email: new FormControl('',),
    address: new FormControl('',),
  })
  onSubmitForm() {

  }
}
