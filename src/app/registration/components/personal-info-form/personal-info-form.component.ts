import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, OnDestroy, SimpleChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormArray, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { RegistrationInfo, toRegistrationInfo } from 'app/common/interfaces';
import { ValidationService } from 'app/common/services/validation.service';

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
    this.UpdateUserNameAndPasswordValidations();
  }

  createRegistrationFormFields() {
    this.registrionGroup.addControl('UserName',
      new FormControl(this.registrationInfo.UserName, [Validators.required, Validators.minLength(8), Validators.maxLength(256), ValidationService.userNameValidator, ValidationService.userNameSpaceValidator]
      ));
    this.registrionGroup.addControl('Password',
      new FormControl(this.registrationInfo.Password, [Validators.required, ValidationService.upperCaseValidator, ValidationService.lowerCaseValidator, ValidationService.numberOrSpecialCharacterValidator, ValidationService.passwordSpaceValidator, Validators.minLength(8), ValidationService.validatePassword.bind(this, this.registrionGroup, 'UserName')]
      ));
    this.registrionGroup.addControl('ReEnterPassword',
      new FormControl(this.registrationInfo.ReEnterPassword, [Validators.required, ValidationService.validateConfirmPassword.bind(this, this.registrionGroup)]
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


  private UpdateUserNameAndPasswordValidations() {
    this.registrionGroup.get(['Password']).valueChanges
      .subscribe(x => {
        this.registrionGroup.get(['ReEnterPassword']).updateValueAndValidity();
      });
    this.registrionGroup.get(['UserName']).valueChanges
      .subscribe(x => {
        this.registrionGroup.get(['Password']).updateValueAndValidity();
      });
  }
}
