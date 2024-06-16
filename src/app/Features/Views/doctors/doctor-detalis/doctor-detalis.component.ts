import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/Core/Models/doctor';
import { DoctorService } from 'src/app/Core/Services/doctor.service';

@Component({
  selector: 'app-doctor-detalis',
  templateUrl: './doctor-detalis.component.html',
  styleUrls: ['./doctor-detalis.component.scss']
})
export class DoctorDetalisComponent {
takeAppoint(arg0: number) {

}
chat(arg0: number) {

}
  doctorDetails!:Doctor
  constructor(private activatedRoute:ActivatedRoute,private doctor:DoctorService){}
  ngOnInit(){
this.getDoctorDet();
  }
  getDoctorDet() {
    let DoctorId = this.activatedRoute.snapshot.params['id'];
    this.doctor.getDoctorById(DoctorId).subscribe({
      next: (data: Doctor) => {
        console.log(data);
        this.doctorDetails = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
