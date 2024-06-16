import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Lab } from 'src/app/Core/Models/lab';
import { Test } from 'src/app/Core/Models/test';
import { TestService } from 'src/app/Core/Services/test.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss'],
})
export class TestsComponent {
  searchTerm: string = '';

  constructor(private test: TestService, private toast: ToastrService) {}
  tests: Test[] = [];
  ngOnInit() {
    this.getTests();
  }
  getTests() {
    this.test.getAllTests().subscribe({
      next: (data: Test[]) => {
        this.tests = data;
      },
    });
  }
  addToCart(tst: Test) {
    let cart: Test[] = JSON.parse(localStorage.getItem('testCart') || '[]');
    let exists: boolean = cart.some((t: any) => t.id === tst.id);
    if (!exists) {
      this.toast.success('Successfuly added to card');
      cart.push(tst);
      localStorage.setItem('testCart', JSON.stringify(cart));
    } else {
      this.toast.info('Test already exists in the cart');
    }
  }
  get filteredTests() {
    return this.tests.filter((test) =>
      test.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
