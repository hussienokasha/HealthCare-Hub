import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isRegister: boolean = false;
  ngOnInit() {
    let token = localStorage.getItem('token');
    if (token) {
      this.isRegister = true;
    }
    else{
      this.isRegister=false;
    }
  }
  geCartItemsLength(){
    if (localStorage.getItem('testCart')){

      return JSON.parse(localStorage.getItem('testCart')!).length;
    }
    return 0;
  }
}
