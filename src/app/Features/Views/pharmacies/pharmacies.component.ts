import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/Core/Models/medicine';
import { MedicineService } from 'src/app/Core/Services/medicine.service';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacies.component.html',
  styleUrls: ['./pharmacies.component.scss'],
})
export class PharmacyComponent implements OnInit {

  medicines: Medicine[] = [];
  searchTerm: string = '';

  constructor(private medicineService: MedicineService) {}

  ngOnInit() {
    this.getMedicine();
  }

  getMedicine() {
    this.medicineService.getAllMedicines().subscribe({
      next: (res: Medicine[]) => {
        this.medicines = res;
      },
    });
  }

  get filteredMedicines() {
    return this.medicines.filter(medicine =>
      medicine.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  addToCart(med: Medicine) {
    localStorage.setItem('medCart',JSON.stringify(''))
  }
}
