import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Doctor } from 'src/app/Core/Models/doctor';
import { DoctorService } from 'src/app/Core/Services/doctor.service';
import { AddDoctorDialogComponent } from './add-doctor-dialog/add-doctor-dialog.component';
import { EditDoctorDialogComponent } from './edit-doctor-dialog/edit-doctor-dialog.component';


@Component({
  selector: 'app-manage-doctors',
  templateUrl: './manage-doctors.component.html',
  styleUrls: ['./manage-doctors.component.scss']
})
export class ManageDoctorsComponent {

  doctors!: Doctor[];
  constructor(private doctor: DoctorService, private addDocrorDialog: MatDialog, private editDocrorDialog: MatDialog) { }
  ngOnInit() {
    this.getAllDoctors();

  }
  openAddDoctorDialog() {
    const dialogRef = this.addDocrorDialog.open(AddDoctorDialogComponent, {});
    dialogRef.componentInstance.doctorAdded.subscribe(() => {
      this.getAllDoctors();
      dialogRef.close(); 
    });
  }
  getAllDoctors() {
    this.doctor.getAllDoctors().subscribe({
      next: (d: Doctor[]) => {
        this.doctors = d;

      }
    })
  }
  removeDoctor(doctorId: number) {
    this.doctor.deleteDoctor(doctorId).subscribe({
      next: (e) => {
        this.getAllDoctors();
      }
    })
  }
  openEditDoctorDialog() {
    const dialogRef = this.editDocrorDialog.open(EditDoctorDialogComponent,{});
  }

}
