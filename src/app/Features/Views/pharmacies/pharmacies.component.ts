import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(    private router: Router,private medicineService: MedicineService,private toast:ToastrService) {}

  ngOnInit() {
    this.getMedicine();
  }

  navigateToMedicineDetails(id: number): void {
    this.router.navigate(['/medicine', id]);
  }
  getMedicine() {
    this.medicineService.getAllMedicines().subscribe({
      next: (res: Medicine[]) => {
        console.log(res)
        this.medicines = res;
      },
    });
  }

  get filteredMedicines() {
    return this.medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  addToCart(med: Medicine) {
    let cart: Medicine[] = JSON.parse(localStorage.getItem('medCart') || '[]');
    let exists: boolean = cart.some(m=>m.id == med.id);
    if(!exists){
      this.toast.success('successfully added to cart')
      cart.push(med);
      localStorage.setItem('medCart', JSON.stringify(cart));
    }
    else{
      this.toast.info('already exists in cart')
    }

  }
}
