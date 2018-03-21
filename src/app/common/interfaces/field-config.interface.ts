import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Option, Selectable} from './selectable.interface';
import { FieldType  } from "../../forms/models/field-type.model";
import { InputType  } from "../../forms/models/input-type.model";

export type ResponsiveTileConfig = [number, number, number];

export interface IFieldConfig<T extends FieldType> {
  name: string;
  fieldType: T;
  defaultValue?: any;
  placeholder?: string;
  hintLabel?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  color?: string;
  // rules?: Rule[] | null;
  disabledIf$?: Observable<boolean>;
  requireIf$?: Observable<boolean>;
  displayIf$?: Observable<boolean>;
  colspanConfig: ResponsiveTileConfig;
  [key:string]: any;
}

export interface IStringValueFieldConfig {
  maxLength?: number;
  minLength?: number;
}

export interface IOptionsFieldConfig {
  options?: Option[];
}

export interface TextboxFieldConfig extends IFieldConfig<FieldType.textbox>, IStringValueFieldConfig {
  inputType: InputType;
}
export interface TextareaFieldConfig extends IFieldConfig<FieldType.textarea>, IStringValueFieldConfig {}
export interface AutocompleteFieldConfig extends IFieldConfig<FieldType.autocomplete>, IStringValueFieldConfig {}
export type StringValueFieldConfig = TextboxFieldConfig | TextareaFieldConfig | AutocompleteFieldConfig;

export interface CheckboxFieldConfig extends IFieldConfig<FieldType.checkbox> {}
export interface MultiCheckboxFieldConfig extends IFieldConfig<FieldType.multicheckbox>, IOptionsFieldConfig {
  children: CheckboxFieldConfig[];
}

export interface SelectFieldConfig extends IFieldConfig<FieldType.select>, IOptionsFieldConfig {}
export interface RadioFieldConfig extends IFieldConfig<FieldType.radiogroup>, IOptionsFieldConfig {}
export type FieldConfigWithOptions = SelectFieldConfig | RadioFieldConfig;

export interface DatepickerFieldConfig extends IFieldConfig<FieldType.datepicker> {
  startView: string;
  startAt?: Date | null;
  maxDate?: Date | null;
  minDate?: Date | null;
}

export interface FileSelectorFieldConfig extends IFieldConfig<FieldType.fileselector> {
}

export type FieldConfig = TextboxFieldConfig
  | SelectFieldConfig
  | RadioFieldConfig
  | DatepickerFieldConfig
  | CheckboxFieldConfig
  | TextareaFieldConfig
  | AutocompleteFieldConfig
  | FileSelectorFieldConfig
  | MultiCheckboxFieldConfig;
