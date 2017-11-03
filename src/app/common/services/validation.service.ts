import { Injectable } from '@angular/core';
import { AbstractControl, Validators, AsyncValidatorFn, ValidatorFn, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

export const VALID_EMAIL = RegExp(/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/);
export const VALID_US_PHONE = RegExp(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[1-9]\d{2}-?\d{4}$/);
export const VALID_CA_POSTALCODE = RegExp(/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/);
export const VALID_US_POSTALCODE = RegExp(/^\d{5}$/);
export const VALID_MX_POSTALCODE = RegExp(/^\d{5}$/);

export const VALID_PASSWORD = RegExp(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/);
export const ALPHANUMERIC = RegExp(/^[0-9a-zA-Z\.\- ]+$/);
export const VALID_DATE = RegExp(/^\d{2}\/\d{2}\/\d{4}$/);
export const NUMERIC = RegExp(/^[0-9\.]+$/);
export const INTEGER = RegExp(/^[0-9]+$/);
export const NUMERIC_WITH_DASH = RegExp(/^[a-zA-Z0-9-]+$/);
export const REQUIRED_CHECKBOX = RegExp(/^true$/)
export const PASSWORD = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/);

@Injectable()
export class ValidationService {

  public static usPhoneValidator = ValidationService.invalidFormatValidatorFactory('invalidUSPhoneNumber', VALID_US_PHONE, 'Invalid phone number')
  public static emailValidator = ValidationService.invalidFormatValidatorFactory('invalidEmailAddress', VALID_EMAIL, 'Invalid email address')
  public static caPostalCodeValidator = ValidationService.invalidFormatValidatorFactory('invalidCAPostalCode', VALID_CA_POSTALCODE, 'Invalid postal code')
  public static usPostalCodeValidator = ValidationService.invalidFormatValidatorFactory('invalidUSPostalCode', VALID_US_POSTALCODE, 'Invalid zip code')
  public static mxPostalCodeValidator = ValidationService.invalidFormatValidatorFactory('invalidMXPostalCode', VALID_MX_POSTALCODE, 'Invalid postal code')
  //public static passwordValidator = ValidationService.invalidFormatValidatorFactory('invalidPassword', VALID_PASSWORD, 'Invalid password. Password must be at least 6 characters long, and contain a number.')
  public static alphanumericValidator = ValidationService.invalidFormatValidatorFactory('invalidAlphanumeric', ALPHANUMERIC, 'Invalid character')
  public static dateValidator = ValidationService.invalidFormatValidatorFactory('invalidDate', VALID_DATE, 'Invalid Date')
  public static numericValidator = ValidationService.invalidFormatValidatorFactory('invalidNumeric', NUMERIC, 'Numeric value required')
  public static integerValidator = ValidationService.invalidFormatValidatorFactory('invalidInteger', INTEGER, 'Integer value required')
  public static numericWithDashValidator = ValidationService.invalidFormatValidatorFactory('invalidNumericWithDash', NUMERIC_WITH_DASH, 'Invalid data.')
  public static requiredCheckedValidator = ValidationService.invalidFormatValidatorFactory('invalidCheckbox', REQUIRED_CHECKBOX, 'Required')
  public static passwordValidator = ValidationService.invalidFormatValidatorFactory('invalidCheckbox', PASSWORD, ' Password must must include at least one upper case letter, one lower case letter, and one numeric digit.')

  public static invalidFormatValidatorFactory(ruleName: string, pattern: RegExp, errorMessage: string): ValidatorFn {
    return (control) => {      
      const val = control.value;
      if (!control.value) return null;      
      if (pattern.test(val)) {        
        return null;
      } else {
        // console.log({control, ruleName, pattern, errorMessage, value: control.value, val:val, matchesPattern: pattern.test(val)}, 'INVALID');
        return { [ruleName]: { valid: false, msg: errorMessage } }
      }
    }
  }

  public static postalCodeValidatorFactory(countryCode: string): ValidatorFn {
    switch (countryCode) {
      case 'CA':
        return ValidationService.caPostalCodeValidator;
      case 'MX':
        return ValidationService.mxPostalCodeValidator;
      default:
        return ValidationService.usPostalCodeValidator;
    }
  }

  public static isTrue(control: AbstractControl): { [key: string]: any } {
    if (control.value == true) {
      return null;
    }
    else {
      return {
        isTrue: {
          valid: false,
          msg: 'Required'
        }
      };
    }

  };

  public static validateDecimalPlacesFactory(places: number): ValidatorFn {
    let pattern= RegExp('^\\d+\\.\\d{'+places+'}$');
    return ValidationService.invalidFormatValidatorFactory('invalidDecimalPlaces', pattern, 'Invalid number format.');
  }

  public static validateEqualsFactory(c1: string, c2: string, msg?: string) {
    return (c: AbstractControl): { [key: string]: any } => {
      const control1 = c.get(c1);
      const control2 = c.get(c2);
      if (control1.pristine || control2.pristine) {
        return null;
      }
      c.markAsTouched();
      const equals = (control1.value === control2.value);

      return equals ? null : {
        validateEqual: {
          valid: false,
          msg: msg,
          c1,
          c2
        }
      };
    };
  }

  public static getControlErrorMessage(control: FormControl): string {
    for (let propertyName in control.errors) {
      // console.log({control: control, propertyName, hasOwnProperty:control.errors.hasOwnProperty(propertyName),touched:control.touched},'validationMessagesControl');
      if (control.errors.hasOwnProperty(propertyName) && control.touched) {
        // console.log({errors:this.control.errors},'errors');
        // return this.control.errors[propertyName];
        let validationErrorObject = control.errors[propertyName];
        if (validationErrorObject && validationErrorObject.msg) return validationErrorObject.msg;
        return ValidationService.getValidatorErrorMessage(propertyName, validationErrorObject);
      }
    }
    return null;
  }

  public static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      'required': 'Required',
      'requiredTrue': 'Required',
      'minlength': `Minimum length ${validatorValue.requiredLength}`,
      'maxlength': `Maxium length ${validatorValue.requiredLength}`,
      'validateEqual': `${validatorValue.c1} must be the same as ${validatorValue.c2}`,
      'mdDatepickerFilter': `Invalid date`,
      'mdDatepickerMin': `Invalid date`,
      'mdDatepickerMax': `Invalid date`,
      'min': `Value must be at least ${validatorValue.min}`,
      'max': `Value must be at most ${validatorValue.max}`,

    };
    //console.log({config, validatorName, validatorValue},'config');
    return validatorValue.msg || config[validatorName] || validatorName;
  }
}



