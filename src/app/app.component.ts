import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading = true;

  ngOnInit(): void {
    // Simulate loading for 3 seconds (adjust as needed)
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
