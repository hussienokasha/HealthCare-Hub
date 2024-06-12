import { FormControl } from "@angular/forms";

export interface Register{
  displayName: FormControl<string | null>;
  email: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
  gender: FormControl<string | null>;
  dateOfBirth: FormControl<string | null>;
}