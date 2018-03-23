import { Injectable } from '@angular/core';
import { AbstractControl, Validators, AsyncValidatorFn, ValidatorFn, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment-mini';

export const QCARD_NOT_ELIGIBLE_STATES: string[] = ['GU', 'FM', 'AS', 'MH', 'NY', 'MP', 'PW', 'PR', 'VI', 'AA', 'AE', 'AP'];
export const VALID_EMAIL = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])+\.([a-zA-Z0-9])*.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/);
export const VALID_US_PHONE = RegExp(/^(1.?)?(\([2-9]\d{2}\)|[2-9]\d{2}).?[1-9]\d{2}.?\d{4}$/);
export const VALID_POSTALCODE = RegExp(/^\d{5}$/);
export const VALID_CA_POSTALCODE = RegExp(/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/);
export const VALID_US_POSTALCODE = RegExp(/^\d{5}$/);
export const VALID_MX_POSTALCODE = RegExp(/^\d{5}$/);
export const VALID_PASSWORD = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,}$/);
export const ALPHANUMERIC = RegExp(/^[0-9a-zA-Z\.\- ]+$/);
export const VALID_DATE = RegExp(/^(((((0[13578])|([13578])|(1[02]))[\-\/\s]?((0[1-9])|([1-9])|([1-2][0-9])|(3[01])))|((([469])|(11))[\-\/\s]?((0[1-9])|([1-9])|([1-2][0-9])|(30)))|((02|2)[\-\/\s]?((0[1-9])|([1-9])|([1-2][0-9]))))[\-\/\s]?\d{4})(\s(((0[1-9])|([1-9])|(1[0-2]))\:([0-5][0-9])((\s)|(\:([0-5][0-9])\s))([AM|PM|am|pm]{2,2})))?$/);
export const NUMERIC = RegExp(/^[0-9\.]+$/);
export const INTEGER = RegExp(/^[0-9]+$/);
export const NUMERIC_WITH_DASH = RegExp(/^[a-zA-Z0-9-]+$/);
export const REQUIRED_CHECKBOX = RegExp(/^true$/);
export const VALID_ADDRESS_CHARACTERS = RegExp(/^[0-9a-zA-Z\!\#\&\'\‘\(\)\,\-\s\.\/\:\;\@\\\` ]+$/);
export const ALPHANUMERIC_WITH_SPECIAL_CHARACTERS = RegExp(/^[0-9a-zA-Z\?\!\#\&\'\‘\(\)\,\-\.\/\:\;\@\\\` ]+$/);
export const ALPHANUMERIC_WITH_DASH = RegExp(/^[a-zA-Z0-9\-\s]+$/);
export const REGISTRATION_KEY = RegExp(/^[0-9a-zA-Z\?\$\!\#\&\'\‘\(\)\,\-\.\/\:\;\@\\\` ]+$/);
export const NOSPACE = RegExp(/^\S*$/)
export const USERNAME = RegExp(/^[0-9a-zA-Z\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}\~\"\:\;\\\>\<\(\)\[\] ]+$/);
export const NUMBER_OR_SPECIAL_CHARACTER = RegExp(/^((?=.*?[0-9])|(?=.*?[#?!@$%^&*-]))/);
export const UPPER_CASE = RegExp(/^(?=.*?[A-Z])/);
export const LOWER_CASE = RegExp(/^(?=.*?[a-z])/);

@Injectable()
export class ValidationService {

  public static usPhoneValidator = ValidationService.invalidFormatValidatorFactory('invalidUSPhoneNumber', VALID_US_PHONE, 'Invalid phone number')
  public static emailValidator = ValidationService.invalidFormatValidatorFactory('invalidEmailAddress', VALID_EMAIL, 'Invalid email address')
  public static postalCodeValidator = ValidationService.invalidFormatValidatorFactory('invalidPostalCode', VALID_POSTALCODE, 'Invalid postal code')
  public static caPostalCodeValidator = ValidationService.invalidFormatValidatorFactory('invalidCAPostalCode', VALID_CA_POSTALCODE, 'Invalid postal code')
  public static usPostalCodeValidator = ValidationService.invalidFormatValidatorFactory('invalidUSPostalCode', VALID_US_POSTALCODE, 'Invalid zip code')
  public static mxPostalCodeValidator = ValidationService.invalidFormatValidatorFactory('invalidMXPostalCode', VALID_MX_POSTALCODE, 'Invalid postal code')
  public static passwordValidator = ValidationService.invalidFormatValidatorFactory('invalidPassword', VALID_PASSWORD, 'Password must contain a Number Or Special Character and one Upper Case and one Lower Case Alpha Character')
  public static alphanumericValidator = ValidationService.invalidFormatValidatorFactory('invalidAlphanumeric', ALPHANUMERIC, 'Invalid character')
  public static alphanumericWithSpecialCharactersValidator = ValidationService.invalidFormatValidatorFactory('invalidAlphanumericWithSpecialCharacters', ALPHANUMERIC_WITH_SPECIAL_CHARACTERS, 'Invalid character')
  public static registrationKeyValidator = ValidationService.invalidFormatValidatorFactory('invalidAlphanumericWithSpecialCharacters', REGISTRATION_KEY, 'Invalid character')
  public static addressCharactersValidator = ValidationService.invalidFormatValidatorFactory('invalidAddressCharacter', VALID_ADDRESS_CHARACTERS, 'Invalid character')
  public static numericValidator = ValidationService.invalidFormatValidatorFactory('invalidNumeric', NUMERIC, 'Numeric value required')
  public static integerValidator = ValidationService.invalidFormatValidatorFactory('invalidInteger', INTEGER, 'Integer value required')
  public static numericWithDashValidator = ValidationService.invalidFormatValidatorFactory('invalidNumericWithDash', NUMERIC_WITH_DASH, 'Invalid data.')
  public static alphaNumericWithDashValidator = ValidationService.invalidFormatValidatorFactory('invalidAlphaNumericWithDash', ALPHANUMERIC_WITH_DASH, 'Invalid character.')

  public static requiredCheckedValidator = ValidationService.invalidFormatValidatorFactory('invalidCheckbox', REQUIRED_CHECKBOX, 'Required')
  public static noSpaceValidator = ValidationService.invalidFormatValidatorFactory('invalidCharacter', NOSPACE, 'Field cannot contain a space.')
  public static userNameValidator = ValidationService.invalidFormatValidatorFactory('invalidCharacter', USERNAME, 'Username does not allow special characters.')
  public static passwordSpaceValidator = ValidationService.invalidFormatValidatorFactory('invalidCharacter', NOSPACE, 'Password cannot contain a space.')
  public static numberOrSpecialCharacterValidator = ValidationService.invalidFormatValidatorFactory('invalidCharacter', NUMBER_OR_SPECIAL_CHARACTER, 'Number or Special Character Needed');
  public static upperCaseValidator = ValidationService.invalidFormatValidatorFactory('invalidCharacter', UPPER_CASE, 'Uppercase Character Needed');
  public static lowerCaseValidator = ValidationService.invalidFormatValidatorFactory('invalidCharacter', LOWER_CASE, 'Lowercase  Character Needed');
  public static userNameSpaceValidator = ValidationService.invalidFormatValidatorFactory('invalidCharacter', NOSPACE, 'Username cannot contain a space.')

  public static invalidFormatValidatorFactory(ruleName: string, pattern: RegExp, errorMessage: string): ValidatorFn {
    return (control) => {
      //console.log({control, ruleName, pattern, errorMessage, value: control.value, matchesPattern: pattern.test(control.value)});
      const val = control.value;
      if (!control.value) return null;
      // console.log({control, ruleName, pattern, errorMessage, value: control.value, val:val, matchesPattern: pattern.test(val)});
      if (pattern.test(val)) {
        // console.log({control, ruleName, pattern, errorMessage, value: control.value, val:val, matchesPattern: pattern.test(val)}, 'VALID!!');
        return null;
      } else {
        // console.log({control, ruleName, pattern, errorMessage, value: control.value, val:val, matchesPattern: pattern.test(val)}, 'INVALID');
        return { [ruleName]: { valid: false, msg: errorMessage } }
      }
    }
  }

  public static dateValidator(control: AbstractControl): { [key: string]: any } {
    const val = moment(control.value, 'MM/DD/YYYY', true);
    const isValidMoment = val.isValid();
    // console.log({control, control_value: control.value, moment_value:val, isValidMoment}, 'dateValidator');
    if (isValidMoment) {
      return null;
    }
    else {
      // console.log({control, ruleName, pattern, errorMessage, value: control.value, val:val, matchesPattern: pattern.test(val)}, 'INVALID');
      return { invalidDate: { valid: false, msg: 'Invalid date.' } }
    }
  }


  public static postalCodeValidatorFactory(countryCode: string): ValidatorFn {
    switch (countryCode) {
      case 'CA':
        return ValidationService.caPostalCodeValidator;
      case 'MX':
        return ValidationService.mxPostalCodeValidator;
      case 'US':
        return ValidationService.usPostalCodeValidator;
      default:
        return ValidationService.postalCodeValidator;
    }
  }

  public static postalCodeDynamicValidator(c: AbstractControl): { [key: string]: any } {
    const countryCodeControl = c.parent.get('CountryCode');
    const countryCode = countryCodeControl ? countryCodeControl.value : null;
    // c.markAsTouched();
    const validator = ValidationService.postalCodeValidatorFactory(countryCode);
    return validator(c);
  }


  public static isTrue(control: AbstractControl): { [key: string]: any } {

    if (!!control.value) {
      return null;
    }
    return {
      isTrue: { valid: false, msg: 'Required' }
    }
  };

  public static requireAny(control: AbstractControl): { [key: string]: any } {
    const filterdArray: string[] = control.value.filter(f => f !== null) as any;
    if (filterdArray.length > 0) {
      return null;
    }
    return { requireAny: { valid: false, msg: 'At least one must be selected.' } };
  }

  public static validateDecimalPlacesFactory(places: number): ValidatorFn {
    let pattern = RegExp('^\\d+\\.\\d{' + places + '}$');
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
      return (control1.value === control2.value) ? null : {
        validateEqual: { valid: false, msg, c1, c2 }
      };
    };
  }

  public static validateConfirmPassword(group: FormGroup, control: AbstractControl) {
    const password = group.get(['Password']);
    if (password == null || control == null) {
      return null;
    }

    if (password.value != control.value) {
      return { mustMatchPassword: { valid: false, msg: 'Must match password.' } };
    }
    return null;
  }


  public static validatePassword(group: FormGroup,field:string, control: AbstractControl) {
    const fieldControl = group.get([field]);
    if (fieldControl == null || control == null) {
      return null;
    }

    if (fieldControl.value == control.value) {
      const message = (field=='UserName')?`Password can NOT equal the User's User Name.`:`New Password cannot match the Current Password.`;
      return { usernameEqual: { valid: false, msg: message } };
    }
    return null;
  }


  public static getControlErrorMessage(control: AbstractControl): string {
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

  public static eligibleStatesValidator(): ValidatorFn {

    return (control) => {
      const val = control.value;
      if (val == QCARD_NOT_ELIGIBLE_STATES.filter(x => x == val)) {
        return { ['notEligibleStates']: { valid: false, msg: 'Cannot send to this state.' } };
      } else {
        return null;
      }

    }
  }

  public static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      'required': 'Required',
      'requiredTrue': 'Required',
      'minlength': `Must be at least ${validatorValue.requiredLength} characters.`,
      'maxlength': `Maximum length ${validatorValue.requiredLength}`,
      'validateEqual': `${validatorValue.c1} must be the same as ${validatorValue.c2}`,
      'matDatepickerFilter': `Invalid date`,
      'matDatepickerMin': `Invalid date`,
      'matDatepickerMax': `Invalid date`,
      'min': `Value must be at least ${validatorValue.min}`,
      'max': `Value must be at most ${validatorValue.max}`
    };
    // console.log({config, validatorName, validatorValue},'config');
    return validatorValue.msg || config[validatorName] || validatorName;
  }
}



