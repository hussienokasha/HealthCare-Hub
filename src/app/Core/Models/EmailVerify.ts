import { FormControl } from "@angular/forms";

export interface VerEmail{
  Email: FormControl<string | null>,
  VerificationCode: FormControl<string | null>,
}