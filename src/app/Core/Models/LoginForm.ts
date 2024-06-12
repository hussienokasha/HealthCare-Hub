import { FormControl } from "@angular/forms";

export interface Login {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}