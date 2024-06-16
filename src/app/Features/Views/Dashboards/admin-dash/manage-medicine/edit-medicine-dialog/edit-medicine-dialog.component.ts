import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Medicine } from 'src/app/Core/Models/medicine';
import { MedicineService } from 'src/app/Core/Services/medicine.service';

@Component({
  selector: 'app-edit-medicine-dialog',
  templateUrl: './edit-medicine-dialog.component.html',
  styleUrls: ['./edit-medicine-dialog.component.scss'],
})
export class EditMedicineDialogComponent {
  @Output() medicineUpdated = new EventEmitter<void>();
  selectedFile!: File;
  previewUrl: any;
  editMedicineformGroup!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private medincine: MedicineService,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public medicineData: Medicine
  ) {}
  ngOnInit() {
    this.editMedicineformGroup = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: [''],
      price: ['', [Validators.required, Validators.min(1)]],
      sideEffects: ['', [Validators.required]],
      ingredients: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
    });
    this.editMedicineformGroup.patchValue({
      name:this.medicineData.name ,
      description: this.medicineData.description,
      price: this.medicineData.price,
      sideEffects: this.medicineData.sideEffects,
      ingredients: this.medicineData.ingredients,
      expiryDate: this.medicineData.expiryDate,
    })
  }

  onSubmitForm() {
    const date = new Date(this.editMedicineformGroup.value.expiryDate);
    date.setHours(date.getHours() + 3);
    const isoDateString = date.toISOString();
    const formData = new FormData();
    formData.append('Name', this.editMedicineformGroup.value.name);
    formData.append('Id', `${this.medicineData.id}`);
    formData.append(
      'Description',
      this.editMedicineformGroup.value.description
    );
    formData.append('Price', this.editMedicineformGroup.value.price);
    formData.append(
      'SideEffects',
      this.editMedicineformGroup.value.sideEffects
    );
    formData.append(
      'Ingredients',
      this.editMedicineformGroup.value.ingredients
    );
    formData.append('ExpiryDate', isoDateString);
    if(this.selectedFile){
      formData.append('Image', this.selectedFile, this.selectedFile.name);
    }
    console.log(this.editMedicineformGroup);
    this.medincine.addMedicine(formData).subscribe({
      next: (d) => {
        this.toast.success('Medicine Added Successfully');
        this.medicineUpdated.emit();
        console.log(d);
      },
      error: (e) => {
        console.log(e);
        this.toast.error(e.error.message);
      },
    });
  }
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.previewUrl = null;
    }
  }
}
