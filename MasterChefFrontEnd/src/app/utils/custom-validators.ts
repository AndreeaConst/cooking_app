import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {

    static passwordStrength(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) {
                return null;
            }

            const hasUpperCase = /[A-Z]+/.test(value);
            const hasLowerCase = /[a-z]+/.test(value);
            const hasNumeric = /[0-9]+/.test(value);
            const hasSpecialCharacter = /[#&@$*]/.test(value);
            const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialCharacter;
            return !passwordValid ? { passwordStrength: true } : null;
        }
    }

    static hasMaximumValue(max: number): ValidatorFn{
        return (control: AbstractControl): ValidationErrors | null => {

            return control.value.length >= max ? { maxValue: true} : null;
        } 
    }

    /*static areEqual(string: any): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            console.log('string '+string);
            console.log('control '+control.value)
            return control.value != string ? { areEqual: true } : null;
        }
    }*/
}