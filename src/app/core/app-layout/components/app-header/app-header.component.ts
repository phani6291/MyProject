import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'schofeat-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
