import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'schofeat-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
