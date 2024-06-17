import { Component } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { NurseDialogComponent } from './add-nurse-dialog/nurse-dialog.component';
import { Nurse } from 'src/app/Core/Models/nurse';
import { NurseService } from 'src/app/Core/Services/nurse.service';
import { EditNurseDialogComponent } from './edit-nurse-dialog/edit-nurse-dialog.component';

@Component({
  selector: 'app-nurses',
  templateUrl: './nurses.component.html',
  styleUrls: ['./nurses.component.scss'],
})
export class NursesComponent {
  Nurses: Nurse[] = [];
  constructor(
    public addDialog: MatDialog,
    private nurse: NurseService,
    private editDialog: MatDialog
  ) {}
  ngOnInit() {
    this.getNurses();
  }
  getNurses() {
    this.nurse.getAllNurses().subscribe({
      next: (d: Nurse[]) => {
        this.Nurses = d;
      },
    });
  }
  openAddNurseDialog() {
    const dialogRef = this.addDialog.open(NurseDialogComponent);
    dialogRef.componentInstance.NurseAdded.subscribe({
      next: () => {
        this.getNurses();
      },
    });
  }
  editNurseDialog(nurse: Nurse) {
    let dialogRef = this.editDialog.open(EditNurseDialogComponent,{data:nurse})
    dialogRef.componentInstance.nurseUpdated.subscribe({
      next:()=>{
        this.getNurses();
      }
    })
  }
}
