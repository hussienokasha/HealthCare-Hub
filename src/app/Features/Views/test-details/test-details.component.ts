import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Test } from 'src/app/Core/Models/test';
import { TestService } from 'src/app/Core/Services/test.service';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.scss']
})
export class TestDetailsComponent {
  constructor(private test:TestService,private activatedRoute:ActivatedRoute){}
  testDetails!:Test;
  ngOnInit(): void {
this.getLabDet()

  }
  getLabDet(){
    let labId = this.activatedRoute.snapshot.params['id'];
    this.test.getTestById(labId).subscribe({
      next:(data:Test)=>{
        console.log(data)
        this.testDetails=data;
      },error:(e)=>{
        console.log(e)
      }
    })
  }
}
