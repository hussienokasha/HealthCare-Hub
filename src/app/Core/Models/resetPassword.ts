import { FormControl } from "@angular/forms";

export interface ResetPassword {
  email: FormControl<string | null>,
  newPassword: FormControl<string | null>,
  confirmPassword: FormControl<string | null>,
  token: FormControl<string | null>
}