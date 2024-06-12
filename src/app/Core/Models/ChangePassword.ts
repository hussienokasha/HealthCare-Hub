import { FormControl } from "@angular/forms";

export interface ChangePassword {
  currentPassword: FormControl<string|null> ,
  newPassword: FormControl<string | null>,
  confirmPassword: FormControl<string | null>
}