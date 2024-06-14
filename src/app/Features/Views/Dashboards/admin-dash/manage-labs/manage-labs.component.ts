import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Lab } from 'src/app/Core/Models/lab';
import { LabService } from 'src/app/Core/Services/lab.service';
import { AddLabDialogComponent } from './add-lab-dialog/add-lab-dialog.component';
import { EditLabDialogComponent } from './edit-lab-dialog/edit-lab-dialog.component';

@Component({
  selector: 'app-manage-labs',
  templateUrl: './manage-labs.component.html',
  styleUrls: ['./manage-labs.component.scss']
})
export class ManageLabsComponent {

  labs!:Lab[];
  constructor(private lab:LabService,private toast:ToastrService,private addLabDialog:MatDialog,private editLabDialog:MatDialog){}
  ngOnInit(){
    this.getAllLabs();
  }
  getAllLabs(){
    this.lab.getAllLabs().subscribe({
      next:(d:Lab[])=>{
        this.labs=d;
      }
    })
  }
  removeLab(labId: number ) {
    this.lab.deleteLab(labId).subscribe({
      next:(d)=>{
        this.getAllLabs();
        this.toast.success("Lab deleted Successfully");
      }
    })
  }
  openEditLabDialog() {
    const dialogRef=  this.editLabDialog.open(EditLabDialogComponent);
    dialogRef.componentInstance.labUpdated.subscribe({
      next:()=>{
        this.getAllLabs();
        dialogRef.close();
      }
    })


  }
  openAddLabDialog() {
    const dialogRef = this.addLabDialog.open(AddLabDialogComponent);
    dialogRef.componentInstance.labAdded.subscribe({
      next:()=>{
        this.getAllLabs();
        this.toast.success('Lab added succesfully')
        dialogRef.close();
      }
    })
  }
}
