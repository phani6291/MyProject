import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';

import { ValidationService } from './validation.service';
import { FieldConfig} from '../interfaces';

@Injectable()
export class ControlBuilder {

  public buildControl(config: FieldConfig){
    const { defaultValue, isDisabled, isRequired, inputType } = config;
    let validators: ValidatorFn[] = [];
    let asyncValidators: AsyncValidatorFn[] = [];
    if( isRequired ) validators.push( Validators.required );
    if( inputType && inputType==='email' ) validators.push( ValidationService.emailValidator );
    if( inputType && inputType==='tel' ) validators.push( ValidationService.usPhoneValidator );
    //if( config.rules ) config.rules.map(rule=> validators.push(mapValidator(rule)));
    return new FormControl(
        { value: defaultValue, disabled: isDisabled },
        validators.length ? validators : null,
        asyncValidators.length ? asyncValidators : null
      );
  }
}

// export function  mapValidator(rule: Rule): ValidatorFn{
//     switch (rule.name) {        
//         default:
//             return (control) => null;
//     }
//   }

