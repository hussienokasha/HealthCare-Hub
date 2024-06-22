import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Doctor } from 'src/app/Core/Models/doctor';
import { ChatService } from 'src/app/Core/Services/chat.service';
import { DoctorService } from 'src/app/Core/Services/doctor.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('messageForm') messageForm?: NgForm;
  messageContent = '';
  doctorId?: number;
  doctor!: Doctor;

  constructor(
    public _chatService: ChatService,
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.doctorId = +params.get('id')!;
      this.getDoctorDetails();
    });
  }

  getDoctorDetails(): void {
    if (this.doctorId) {
      this.doctorService.getDoctorById(this.doctorId).subscribe({
        next: (doctor) => {
          this.doctor = doctor;
          console.log('Doctor details:', doctor);
        },
        error: (err) => {
          this.toastr.error('Failed to load doctor details');
          console.error('Error loading doctor details:', err);
        }
      });
    }
  }

  sendMessage() {
    console.log(this.doctor.name);
    this._chatService.sendMessage(this.doctor.name, this.messageContent).then(() => {
      console.log("Message sent");
      this.messageForm?.reset();
    });
  }
}
