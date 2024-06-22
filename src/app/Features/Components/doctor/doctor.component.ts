import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/Core/Models/doctor';
import { ClinicService } from 'src/app/Core/Services/clinic.service';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  
  selectedGender!: string;
  selectedExperience!: string;
  selectedPrice!: string;
  clinicId: number | null = null;
  doctors: Doctor[] = [];
  constructor(
    private route: ActivatedRoute,
    private clinicService: ClinicService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clinicId = +params['id']; // Get clinic ID from route parameter
      if (this.clinicId !== null) {
        this.clinicService.getDoctorsByClinicId(this.clinicId).subscribe((data: Doctor[]) => {
          this.doctors = data;
        });
      }
    });


    
  }
  formatShift(startTime: string, endTime: string): string {
    const start = this.formatTime(startTime);
    const end = this.formatTime(endTime);
    return `${start} - ${end}`;
  }

  formatTime(time: string): string {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, '0')} ${period}`;
  }

 
}