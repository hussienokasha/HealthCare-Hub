import { Component } from '@angular/core';
import { NurseService } from 'src/app/Core/Services/nurse.service';

@Component({
  selector: 'app-nurse-appointment',
  templateUrl: './nurse-appointment.component.html',
  styleUrls: ['./nurse-appointment.component.scss'],
})
export class NurseAppointmentComponent {
  appointments: any[] = [];
  constructor(private appointment: NurseService) {}
  ngOnInit() {
    this.getAllAppointments()
  }



  getAllAppointments() {
    this.appointment.getAllAppointments().subscribe({
      next: (data: any) => {
        this.appointments = data;
        console.log(data)
      },
    });
  }
}
