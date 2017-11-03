import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FileDetails } from '../../../common/interfaces/file-details';

@Component({
  selector: 'schofeat-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  fileDetails: FileDetails;
  constructor() { }

  ngOnInit() {
  }
  
  onChange(fileDetails: FileDetails) {
    this.fileDetails = fileDetails;
  }
}
