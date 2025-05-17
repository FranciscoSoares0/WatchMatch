import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function PasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;

    if (!password) return null;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const minLength = password.length >= 8;

    const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && minLength;

    return isValid
      ? null
      : {
          passwordStrength: {
            hasUpperCase,
            hasLowerCase,
            hasNumber,
            hasSpecialChar,
            minLength,
          },
        };
  };
}
