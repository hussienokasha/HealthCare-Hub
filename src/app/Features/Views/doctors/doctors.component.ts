import { Component } from '@angular/core';
import { Doctor } from 'src/app/Core/Models/doctor';
import { ChatService } from 'src/app/Core/Services/chat.service';
import { DoctorService } from 'src/app/Core/Services/doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
})
export class DoctorsComponent {
  constructor(
    private doctor: DoctorService,
    private _chatService: ChatService
  ) {}

  doctors: Doctor[] = [];
  searchTerm: string = '';
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

  goChat() {
    //this._chatService.createHubConnection(this.users,this.member.userName)
  }
}
