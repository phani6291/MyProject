import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, OnDestroy, SimpleChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormArray, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { RegistrationInfo, toRegistrationInfo } from '../../../../common/interfaces';
import { ValidationService } from '../../../../common/services/validation.service';

@Component({
  selector: 'schofeat-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalInfoFormComponent implements OnInit {
  // @Input() isStudent:boolean;
  @Input() registrationInfo: RegistrationInfo;
  @Input() registrionGroup: FormGroup;
  gender = [{ label: 'Male', value: 'Male' },{ label: 'Female', value: 'Female' }];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {    
    this.registrationInfo = toRegistrationInfo(this.registrationInfo);
    this.createRegistrationFormFields();
  }

  createRegistrationFormFields() {
    this.registrionGroup.addControl('UserName',
      new FormControl(this.registrationInfo.UserName, [Validators.required, Validators.maxLength(20), Validators.minLength(8), ValidationService.alphanumericValidator]
      ));
    this.registrionGroup.addControl('Password',
      new FormControl(this.registrationInfo.Password, [Validators.required, Validators.minLength(6), Validators.maxLength(16), ValidationService.passwordValidator]
      ));
    this.registrionGroup.addControl('ReEnterPassword',
      new FormControl(this.registrationInfo.ReEnterPassword, [Validators.required, Validators.minLength(6), Validators.maxLength(16), ValidationService.passwordValidator]
      ));
    this.registrionGroup.addControl('FirstName',
      new FormControl(this.registrationInfo.FirstName, [Validators.required, ValidationService.alphanumericValidator]
      ));
    this.registrionGroup.addControl('LastName',
      new FormControl(this.registrationInfo.LastName, [Validators.required, ValidationService.alphanumericValidator])
    );
    this.registrionGroup.addControl('BirthDate',
      new FormControl(this.registrationInfo.BirthDate, [Validators.required]
      ));
    this.registrionGroup.addControl('Gender',
      new FormControl(this.registrationInfo.Gender, [Validators.required]
      ));
    this.registrionGroup.addControl('Phone',
      new FormControl(this.registrationInfo.Phone, [Validators.required, ValidationService.usPhoneValidator]
      ));
    this.registrionGroup.addControl('Email',
      new FormControl(this.registrationInfo.EmailAddress, [Validators.required, ValidationService.emailValidator]
      ));
  }

}
