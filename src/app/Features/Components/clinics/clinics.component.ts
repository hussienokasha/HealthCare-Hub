import { Component, OnInit } from '@angular/core';
import { faTooth, faStethoscope, faChild, faHeartbeat, faViruses, faBaby, faDna, faLungs, faBrain, faPhone, faUserMd, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { ReturnClinicDto } from 'src/app/Core/Models/clinic';
import { ClinicService } from 'src/app/Core/Services/clinic.service';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.scss']
})
export class ClinicsComponent implements OnInit {
  
  clinics: { id:number,name: string; icon: any; }[] = [];

  constructor(private clinicService: ClinicService) {}

  ngOnInit(): void {
    this.clinicService.getAllClinics().subscribe((data: ReturnClinicDto[]) => {
      this.clinics = data.map(clinic => {
        return {
          id:clinic.id,
          name: clinic.name,
          icon: this.getIconForClinic(clinic.name)
        };
      });
    });
  }
  getDoctors(clinicId: number) {
    this.clinicService.getDoctorsByClinicId(clinicId).subscribe((doctors: any) => {
      // Handle doctors data here, e.g., show in a modal or navigate to a new component
      console.log(doctors);
    });
  }
  getIconForClinic(clinicName: string) {
    switch (clinicName) {
      case 'Dental Clinic':
        return faTooth;
      case 'Urology Clinic':
        return faViruses;
      case 'Pediatric Clinic':
        return faChild;
      case 'General Medicine Clinic':
        return faStethoscope;
      case 'Infertility and Reproductive Clinic':
        return faBaby;
      case 'Obstetrics and Gynecology Clinic':
        return faHeartbeat;
      case 'Genetic Medicine Clinic':
        return faDna;
      case 'Internal Medicine Clinic':
        return faLungs;
      case 'Child Behavior Development Clinic':
        return faBrain;
      case 'Emergency Medicine Clinic':
        return faPhone;
      case 'Family Medicine Clinic':
        return faUserMd;
      case 'Therapeutic Nutrition Clinic':
        return faUtensils;
      default:
        return faStethoscope; // default icon
    }
  }
}