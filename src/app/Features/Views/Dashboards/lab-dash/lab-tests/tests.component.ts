import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TestDialogComponent } from './add-test-dialog/test-dialog.component';
import { Test } from 'src/app/Core/Models/test';
import { TestService } from 'src/app/Core/Services/test.service';
import { EditTestDialogComponent } from './edit-test-dialog/edit-test-dialog.component';

@Component({
  selector: 'app-lab-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss'],
})
export class LabTestsComponent {
  tests: Test[] = [];
  constructor(public addDialog: MatDialog, private test: TestService,public editDialog: MatDialog,) {}
  ngOnInit() {
    this.getTests();
  }
  openAddTestDialog(): void {
    const dialogRef = this.addDialog.open(TestDialogComponent);
    dialogRef.componentInstance.testAdded.subscribe({
      next: () => {
        this.getTests();
        dialogRef.close();
      },
    });
  }
  getTests() {
    this.test.getAllTests().subscribe({
      next: (d: Test[]) => {
        this.tests = d;
      },
    });
  }
  removeTest(testId: number) {
    this.test.deleteTest(testId).subscribe({
      next: () => {
        this.getTests();
      },
    });
  }
  openDetailsDialog() {}
  editTestDialog() {
    const dialogRef = this.editDialog.open(EditTestDialogComponent);
    dialogRef.componentInstance.testEdited.subscribe({
      next:()=>{
        this.getTests();
        dialogRef.close();
      }
    })
  }
}
