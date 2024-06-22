import { Component } from '@angular/core';
import { Test } from 'src/app/Core/Models/test';
import { TestService } from 'src/app/Core/Services/test.service';

@Component({
  selector: 'app-test-demo',
  templateUrl: './test-demo.component.html',
  styleUrls: ['./test-demo.component.scss']
})
export class TestDemoComponent {
  tests: Test[] = [];
  constructor(private _testService: TestService) {}
  ngOnInit(): void {
    this.getTests();
  }

  getTests() {
    this._testService.getAllTests().subscribe({
      next: (data) => {
        console.log(data);
        this.tests = data; // Assign the entire array to the 'lab' variable
        console.log(this.tests);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
