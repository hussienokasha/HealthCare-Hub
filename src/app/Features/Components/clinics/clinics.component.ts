import { Component } from '@angular/core';
import { faTooth, faStethoscope, faChild, faHeartbeat, faViruses, faBaby, faDna, faLungs, faBrain, faPhone, faUserMd, faUtensils } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.scss']
})
export class ClinicsComponent {
  clinics = [
    { name: 'Dental Clinic', icon: faTooth },
    { name: 'Urology Clinic', icon: faViruses },
    { name: 'Pediatric Clinic', icon: faChild },
    { name: 'General Medicine Clinic', icon: faStethoscope },
    { name: 'Infertility and Reproductive Clinic', icon: faBaby },
    { name: 'Obstetrics and Gynecology Clinic', icon: faHeartbeat },
    { name: 'Genetic Medicine Clinic', icon: faDna },
    { name: 'Internal Medicine Clinic', icon: faLungs },
    { name: 'Child Behavior Development Clinic', icon: faBrain },
    { name: 'Emergency Medicine Clinic', icon: faPhone },
    { name: 'Family Medicine Clinic', icon: faUserMd },
    { name: 'Therapeutic Nutrition Clinic', icon: faUtensils },
  ];
}
