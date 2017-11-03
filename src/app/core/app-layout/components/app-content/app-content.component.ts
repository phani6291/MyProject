import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'schofeat-app-content',
  templateUrl: './app-content.component.html',
  styleUrls: ['./app-content.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppContentComponent implements OnInit {
  group: FormGroup;
  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.group = this.fb.group({});
    this.group.addControl('userName',
      new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]
      ));
    this.group.addControl('password',
      new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]
      ));    
  }

}
