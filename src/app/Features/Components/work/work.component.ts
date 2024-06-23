import { Component } from '@angular/core';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
})
export class WorkComponent {
  scroll() {
    window.scrollTo(0, 1000);
  }

  constructor() {}
}
