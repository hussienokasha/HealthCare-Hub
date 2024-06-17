import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isRegister: boolean = false;
  ngOnInit() {
    let token = localStorage.getItem('token');
    if (token) {
      this.isRegister = true;
    } else {
      this.isRegister = false;
    }
  }
  geCartItemsLength() {
    const testCartItems = JSON.parse(localStorage.getItem('testCart') ?? '[]');
    const medCartItems = JSON.parse(localStorage.getItem('medCart') ?? '[]');

    return testCartItems.length + medCartItems.length;
  }
}
