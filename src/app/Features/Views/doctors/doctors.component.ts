import { Component } from '@angular/core';
import { Doctor } from 'src/app/Core/Models/doctor';
import { DoctorService } from 'src/app/Core/Services/doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
})
export class DoctorsComponent {
chat(arg0: number) {

}
takeAppoint(arg0: number) {

}
  doctors: Doctor[] = [];
  searchTerm: string='';
  constructor(private doctor: DoctorService) {}
  ngOnInit() {
    this.getDoctors();
  }
  getDoctors() {
    this.doctor.getAllDoctors().subscribe({
      next: (d: Doctor[]) => {
        this.doctors = d;
      },
    });
  }
  get filteredDoctors() {
    return this.doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
