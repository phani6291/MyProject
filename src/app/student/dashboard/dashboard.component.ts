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
  constructor(public fb: FormBuilder) {}
  activities: string[] = ['Fishing', 'Hunting', 'Boating'];
  listedActivities: string[];
  newActivity: string;
  ngOnInit() {
    this.fileFormGroup = this.fb.group({ file: null });
    this.listedActivities = this.activities;
  }

  onChange(fileDetails: FileDetails) {
    this.fileDetails = fileDetails;
  }

  addActivity() {
    if (!this.newActivity) return;
    if (this.activities.includes(this.newActivity)) return;
    this.activities.push(this.newActivity);
    this.newActivity = '';
  }
  deleteActivity(activity: string) {
    console.log(activity);
    this.activities.splice(this.activities.indexOf(activity), 1);
  }
}
