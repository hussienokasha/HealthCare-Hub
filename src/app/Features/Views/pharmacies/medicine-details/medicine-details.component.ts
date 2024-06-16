import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medicine } from 'src/app/Core/Models/medicine';
import { MedicineService } from 'src/app/Core/Services/medicine.service';

@Component({
  selector: 'app-medicine-details',
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.scss'],
})
export class MedicineDetailsComponent {

  medicineDetails!: Medicine;
  constructor(
    private activatedRoute: ActivatedRoute,
    private medicine: MedicineService
  ) {}
  ngOnInit(){
    let medicineId = this.activatedRoute.snapshot.params['id'];
    this.getMedicineDetails(medicineId);
  }
  getMedicineDetails(id:number){
    this.medicine.getMedicineById(id).subscribe({
      next:(m:Medicine)=>{
        this.medicineDetails=m;
      }
    })
  }
}
