import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-nurse-dialog',
  templateUrl: './edit-nurse-dialog.component.html',
  styleUrls: ['./edit-nurse-dialog.component.scss'],
})
export class EditNurseDialogComponent {
  nurseUpdated = new EventEmitter<void>();
}
