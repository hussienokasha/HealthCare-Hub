import { Component } from '@angular/core';
import { DoctorService } from 'src/app/Core/Services/doctor.service';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.scss']
})
export class DoctorAppointmentComponent {
  appointments: any[] = [];
  constructor(private appointment: DoctorService) {}
  ngOnInit() {
    this.getAllAppointments(1)
  }



  getAllAppointments(id:number) {
    this.appointment.getAllAppointments(id).subscribe({
      next: (data: any) => {
        this.appointments = data;
        console.log(data)
      },
    });
  }
}
