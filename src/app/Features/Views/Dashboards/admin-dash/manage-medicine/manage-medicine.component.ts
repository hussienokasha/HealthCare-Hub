import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Medicine } from 'src/app/Core/Models/medicine';
import { MedicineService } from 'src/app/Core/Services/medicine.service';
import { AddMedicineDialogComponent } from './add-medicine-dialog/add-medicine-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { EditMedicineDialogComponent } from './edit-medicine-dialog/edit-medicine-dialog.component';

@Component({
  selector: 'app-manage-medicine',
  templateUrl: './manage-medicine.component.html',
  styleUrls: ['./manage-medicine.component.scss']
})
export class ManageMedicineComponent {
  medicines!: Medicine[];
  constructor(private medicine: MedicineService, private dialog: MatDialog, private toast:ToastrService) { }
ngOnInit(){
  this.getAllMedicines();
}
  getAllMedicines() {
    this.medicine.getAllMedicines().subscribe({
      next: (medicines: Medicine[]) => {
        this.medicines = medicines;
      }
    })
  }
  openAddMedicineDialog() {
    const dialogRef = this.dialog.open(AddMedicineDialogComponent);
    dialogRef.componentInstance.medicineAdded.subscribe({
      next: () => {
        this.getAllMedicines();
        dialogRef.close();
      }
    })

  }
  removeMedicine(medicineID: number) {
    this.medicine.deleteMedicine(medicineID).subscribe({
      next: (d) => {
        this.getAllMedicines();
        this.toast.success("Medicine deleted Successfully");
      },error:()=>{
        this.toast.error("Medicine not deleted Successfully");
      }
    })
  }
  openEditMedicineDialog() {
    const dialogRef = this.dialog.open(EditMedicineDialogComponent);
    dialogRef.componentInstance.medicineUpdated.subscribe({
      next: () => {
        this.getAllMedicines();
        dialogRef.close();
      }
    })
  }

}
