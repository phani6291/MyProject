import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { FormGroupDirective, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { FileDetails } from 'app/common/interfaces/file-details';

@Component({
  selector: 'schofeat-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  fileDetails: FileDetails;
  fileFormGroup: FormGroup;
  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.fileFormGroup = this.fb.group({ file: null });
  }
  
  onChange(fileDetails: FileDetails) {
    this.fileDetails = fileDetails;
  }
}
