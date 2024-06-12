import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TestDialogComponent } from './test-dialog/test-dialog.component';
import { Test } from 'src/app/Core/Models/test';
import { TestService } from 'src/app/Core/Services/test.service';

@Component({
  selector: 'app-lab-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class LabTestsComponent {
  openDetailsDialog() {
    
  }
  editDialog() {

  }
  deleteDialog() {

  }

  constructor(public dialog: MatDialog, private test: TestService) { }
  tests: Test[] = [];
  ngOnInit() {
    this.getTests();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(TestDialogComponent, {});
    dialogRef.afterClosed().subscribe(() => this.getTests())
  }
  getTests() {
    this.test.getAllTests().subscribe({
      next: (d: Test[]) => {
        this.tests = d
      }
    })
  }
}
