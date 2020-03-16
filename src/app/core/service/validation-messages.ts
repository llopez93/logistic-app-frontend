import {AbstractControl, FormControl, ValidatorFn} from "@angular/forms";

export class ValidationMessages {

  getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Este campo es obligatorio.',
      'email': 'No es un email valido.',
      'invalidPassword': 'Password invalido. El password debe al menos 6 caracteres, y contener un numero.',
      'minlength': `Este campo debe tener al menos ${validatorValue.requiredLength} caracteres.`,
      'maxlength': `Este campo no debe tener mas de ${validatorValue.requiredLength} caracteres.`,
      'min': `El valor mínimo de este campo es ${validatorValue.min}.`,
      'max': `El valor máximo de este campo es ${validatorValue.max}.`,
      'isNumber': 'Este campo solo puede contener números.'
    };
    return config[validatorName];
  }

  errorMessages(control: AbstractControl): string[] {
    const messages = [];
    if (control) {
      for (let propertyName in control.errors) {
        if (!control.pristine) {
          messages.push(this.getValidatorErrorMessage(propertyName, control.errors[propertyName]));
        }
      }
    }

    return messages.slice(0, 1);
  }

  passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return {'invalidPassword': true};
    }
  }

  /** Validación numerica */
  isNumber(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const exp = new RegExp('^[0-9]+$');
      const valid = exp.test(control.value);
      return valid ? null : {'isNumber': {value: control.value}};
    };
  }

}
