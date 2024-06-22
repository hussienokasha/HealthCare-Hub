import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private route: Router) {}
  ngOnInit() {
    let role = localStorage.getItem('role');
    if (role == 'Nurse') {
      this.route.navigate(['/dashboard/nurse']);
    } else if (role == 'Doctor') {
      this.route.navigate(['/dashboard/doctor']);
    } else if (role == 'Admin') {
      this.route.navigate(['/dashboard/admin/manage-doctors']);
    } else if (role == 'AdminLab') {
      this.route.navigate(['/dashboard/admin-lab/appointment']);
    } else {
      this.route.navigate(['/home']);
    }
  }
}
