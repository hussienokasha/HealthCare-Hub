import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  public toast: ToastrService = inject(ToastrService);
  formGroup: FormGroup = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),

  })
  submitForm() {
    if (this.formGroup.valid) {
      emailjs
        .send("service_mp499vf", "template_uc8p5q2", {
          from_name: this.formGroup.get('fname')!.value + " " + this.formGroup.get('lname')!.value,
          email: this.formGroup.get('email')!.value,
          subject: this.formGroup.get('subject')!.value,
          message: this.formGroup.get('message')!.value,
          reply_to:'Dawaya'
        }, {
          publicKey: '-8eHgs8mv6r5p6nML',
        })
        .then(
          (response) => {
            this.toast.success('Message Sent Successfully',response.text)
            this.formGroup.reset();
          },
          (err) => {
            this.toast.error('FAILED...',err)
          },
        );

    }

  }
}
