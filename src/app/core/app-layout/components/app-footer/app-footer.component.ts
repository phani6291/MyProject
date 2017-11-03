import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'schofeat-app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppFooterComponent implements OnInit {

  currentYear: number;

  constructor() { }

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
  }

}
