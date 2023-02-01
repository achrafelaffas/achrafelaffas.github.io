import { AbstractControl } from '@angular/forms';

export function AgeValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value < 18 || control.value > 60) {
    return { 'age': true };
  }
  return null;
}