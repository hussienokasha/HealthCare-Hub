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
    private route: ActivatedRoute,
    private medicineService: MedicineService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getMedicineDetails(+id);
    }  
  }

  getMedicineDetails(id: number): void {
    this.medicineService.getMedicineById(id)
      .subscribe(medicine => this.medicineDetails = medicine);
  }
}
