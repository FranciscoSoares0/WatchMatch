import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ConfirmPasswordValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get(passwordKey)?.value;
      const confirmPassword = group.get(confirmPasswordKey)?.value;
  
      return password === confirmPassword ? null : { passwordsMismatch: true };
    };
  }