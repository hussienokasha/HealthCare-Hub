import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-edit-medicine-dialog',
  templateUrl: './edit-medicine-dialog.component.html',
  styleUrls: ['./edit-medicine-dialog.component.scss']
})
export class EditMedicineDialogComponent {
onSubmitForm() {
throw new Error('Method not implemented.');
}
onFileChange($event: Event) {
throw new Error('Method not implemented.');
}
 @Output() medicineUpdated = new EventEmitter<void>();
editMedicineformGroup!: FormGroup;
previewUrl: any;
constructor(){}

}
