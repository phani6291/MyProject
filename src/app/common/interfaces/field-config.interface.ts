import { ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Option, Selectable} from './selectable.interface';

export interface FieldConfig {
    name: string;
    fieldType: string;
    defaultValue?: any;
    placeholder?: string;
    hintLabel?: string;
    inputType?: string;
    isDisabled?: boolean;
    isDisabled$?: Observable<boolean>;
    options?: Option[];
    isRequired?: boolean;
    startView?: string;
    startAt?: Date | null;
    maxLength?: number;
    minLength?: number;
    color?: string;
    maxDate?:Date | null;
    minDate?:Date | null;
  }