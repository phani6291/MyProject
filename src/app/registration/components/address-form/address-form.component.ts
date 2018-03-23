import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, OnDestroy, SimpleChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormArray, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Address, Selectable, Country, Region, getSelectableCountries, getSelectableRegions, toAddress } from 'app/common/interfaces';
import { ValidationService } from 'app/common/services/validation.service';

@Component({
  selector: 'schofeat-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() address: Address;
  @Input() group: FormGroup;
  countries: Selectable<Country>[];
  regions: Selectable<Region>[];
  selectedCountryCode: string;
  onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnChanges = (changes: SimpleChanges) => { }

  refresh() {
    this.group.reset({ ...this.address }, { emitEvent: true })
    this.changeDetectorRef.markForCheck();
  }

  registerOnChange() {
    this.ngOnChanges = (changes: SimpleChanges) => {
      this.regions = getSelectableRegions(this.selectedCountryCode);
      if (changes.address) {
        this.refresh()
      }
    }
  }

  ngOnInit() {
    this.address = toAddress(this.address);
    if (this.address.CountryCode) {
      this.regions = getSelectableRegions(this.address.CountryCode);
    }
    //this.group = this.fb.group({});
    this.countries = getSelectableCountries();
    this.createFormFields();
    this.registerOnChange();
    this.refresh()
  }

  createFormFields() {
  
    this.group.addControl('AddressLine1',
      new FormControl(this.address.AddressLine1, [Validators.required, Validators.maxLength(30), ValidationService.alphanumericValidator]
      ));
    this.group.addControl('AddressLine2',
      new FormControl(this.address.AddressLine2, [Validators.maxLength(30), ValidationService.alphanumericValidator]
      ));
    this.group.addControl('City',
      new FormControl(this.address.City, [Validators.required, Validators.maxLength(30), ValidationService.alphanumericValidator]
      ));
    this.group.addControl('RegionCode',
      new FormControl(this.address.RegionCode, [Validators.required]
      ));
    this.group.addControl('CountryCode',
      new FormControl(this.address.CountryCode, [Validators.required])
    );
    this.group.addControl('PostalCode',
      new FormControl(this.address.PostalCode, [Validators.required, ValidationService.usPostalCodeValidator]
      ));

  }

  userSelectedCountry(event) {
    this.selectedCountryCode = event.value;
    this.regions = getSelectableRegions(this.selectedCountryCode);
    this.group.get('RegionCode').setValue('', { emitEvent: true });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    // Unsubscribe from the subject itself:
    this.onDestroy$.unsubscribe();
  }

}
