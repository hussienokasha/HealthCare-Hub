import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isRegister: boolean = false;
  isNavbarFixed: boolean = false;

  ngOnInit() {
    let token = localStorage.getItem('token');
    if (token) {
      this.isRegister = true;
    } else {
      this.isRegister = false;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Detect scroll position
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Add or remove 'navbar-fixed' class based on scroll position
    this.isNavbarFixed = scrollPosition > 0;
  }

  geCartItemsLength() {
    const testCartItems = JSON.parse(localStorage.getItem('testCart') ?? '[]');
    const medCartItems = JSON.parse(localStorage.getItem('medCart') ?? '[]');

    return testCartItems.length + medCartItems.length;
  }
}