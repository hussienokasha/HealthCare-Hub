import { Component} from '@angular/core';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
})
export class WorkComponent {
  services = [
    { title: 'Book with Doctor', description: 'حجز مع طبيب', icon: 'fas fa-user-md' },
    { title: 'Lab Tests', description: 'تحليل', icon: 'fas fa-vials' },
    { title: 'Buy Medicines', description: 'شراء ادويه', icon: 'fas fa-pills' },
    { title: 'Home Visit', description: 'زياره منزليه', icon: 'fas fa-home' }
  ];
  constructor(  ) {}

}
