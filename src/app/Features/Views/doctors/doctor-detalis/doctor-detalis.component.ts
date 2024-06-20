import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Core/Models/User';
import { Doctor } from 'src/app/Core/Models/doctor';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { ChatService } from 'src/app/Core/Services/chat.service';
import { DoctorService } from 'src/app/Core/Services/doctor.service';

@Component({
  selector: 'app-doctor-detalis',
  templateUrl: './doctor-detalis.component.html',
  styleUrls: ['./doctor-detalis.component.scss']
})
export class DoctorDetalisComponent {
  otherUser!:Doctor
  user!:any;
  doctorDetails!:Doctor
  constructor(private _authService:AuthService,private _chatService:ChatService,private activatedRoute:ActivatedRoute,private doctor:DoctorService){}
  ngOnInit(){
this.getDoctorDet();
  }
  getDoctorDet() {
    let DoctorId = this.activatedRoute.snapshot.params['id'];
    this.doctor.getDoctorById(DoctorId).subscribe({
      next: (data: Doctor) => {
        console.log(data);
        this.doctorDetails = data;
        this.otherUser = data;
        console.log(this.otherUser);

      },
      error: (e) => {
        console.log(e);
      },
    });
  }


  goChat(){
    this._authService.getUserData().subscribe({
      next:(res)=>{
        this.user=res;
        console.log(this.otherUser.name)
        this._chatService.createHubConnection(this.user,this.otherUser.name)

      }
    })
    }
  
}
