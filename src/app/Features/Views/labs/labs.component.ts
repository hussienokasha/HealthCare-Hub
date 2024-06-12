import { Component, OnInit } from '@angular/core';
import { Lab } from 'src/app/Core/Models/lab';
import { LabService } from 'src/app/Core/Services/lab.service';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.scss']
})
export class LabsComponent implements OnInit {
  constructor(private lab: LabService) { }
  labs: Lab[] = [];
  ngOnInit() {
    this.GetLabs()
  }
  GetLabs() {
    this.lab.getAllLabs().subscribe({
      next: (d: Lab[]) => this.labs = d,
      error: e => { console.log(e) }
    })
  }
}
