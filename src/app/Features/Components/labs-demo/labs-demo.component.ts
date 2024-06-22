import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Lab } from 'src/app/Core/Models/lab';
import { LabService } from 'src/app/Core/Services/lab.service';

@Component({
  selector: 'app-labs-demo',
  templateUrl: './labs-demo.component.html',
  styleUrls: ['./labs-demo.component.scss'],
})
export class LabsDemoComponent implements OnInit {
  labs: Lab[] = [];
  constructor(private _labService: LabService) {}
  ngOnInit(): void {
    this.getLabs();
  }

  getLabs() {
    this._labService.getAllLabs().subscribe({
      next: (data) => {
        console.log(data);
        this.labs = data; // Assign the entire array to the 'lab' variable
        console.log(this.labs);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  slidesPerView: number = 7;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.slidesPerView = this.getSlidesPerView();
  }

  getSlidesPerView() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 576) {
      return 2; // Adjust the number of slides per view for smaller screens
    } else if (screenWidth < 992) {
      return 4; // Adjust for medium-sized screens
    } else {
      return 7; // Default number of slides per view for larger screens
    }
  }
}
