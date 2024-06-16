import { Component } from '@angular/core';
import { Doctor } from 'src/app/Core/Models/doctor';
import { DoctorService } from 'src/app/Core/Services/doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
})
export class DoctorsComponent {
  doctors: Doctor[] = [];
  constructor(private doctor: DoctorService) {}
  ngOnInit(){
    this.getDoctors();
  }
  getDoctors(){
    this.doctor.getAllDoctors().subscribe({
      next:(d:Doctor[])=>{
        this.doctors = d;
      }
    })
  }
}
