import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MedicineService } from 'src/app/Core/Services/medicine.service';



@Component({
  selector: 'app-add-medicine-dialog',
  templateUrl: './add-medicine-dialog.component.html',
  styleUrls: ['./add-medicine-dialog.component.scss']
})
export class AddMedicineDialogComponent {
  @Output() medicineAdded = new EventEmitter<void>();
  selectedFile!: File;
  previewUrl: any;
  addMedicineformGroup!: FormGroup;
  constructor(private fb: FormBuilder,private medincine:MedicineService,private toast:ToastrService) { }
  ngOnInit() {
    this.addMedicineformGroup = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      picturUrl: ['', [Validators.required]],
      price: ['', [Validators.required,Validators.min(1)]],
      sideEffects: ['', [Validators.required]],
      ingredients: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
    })
  }

  onSubmitForm() {
    const date = new Date(this.addMedicineformGroup.value.expiryDate);
    date.setHours(date.getHours() + 3)
    const isoDateString = date.toISOString();
    const formData = new FormData();
    formData.append('Name', this.addMedicineformGroup.value.name);
    formData.append('Description', this.addMedicineformGroup.value.description);
    formData.append('Price', this.addMedicineformGroup.value.price);
    formData.append('SideEffects', this.addMedicineformGroup.value.sideEffects);
    formData.append('Ingredients', this.addMedicineformGroup.value.ingredients);
    formData.append('ExpiryDate', isoDateString);
    formData.append('Image', this.selectedFile, this.selectedFile.name);
    console.log(this.addMedicineformGroup)
    this.medincine.addMedicine(formData).subscribe({
      next:(d)=>{
        this.toast.success('Medicine Added Successfully');
        this.medicineAdded.emit();
        console.log(d)
      },error:(e)=>{
        console.log(e)
        this.toast.error(e.error.message);
      }
    })

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
