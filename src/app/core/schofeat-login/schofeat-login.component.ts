import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SchofeatLoginInfo, SchoFeatLoginStore } from './store';
import { Router } from '@angular/router';
import { ValidationService } from '../../common/services/validation.service'

@Component({
  selector: 'schofeat-schofeat-login',
  templateUrl: './schofeat-login.component.html',
  styleUrls: ['./schofeat-login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchofeatLoginComponent implements OnInit {

  group: FormGroup;
  constructor(public fb: FormBuilder,
    private schoFeatLoginStore: SchoFeatLoginStore,
    //public dialog: MatDialog
    private router: Router
  ) { }

  ngOnInit() {
    this.group = this.fb.group({});
    this.group.addControl('userName',
      new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20),ValidationService.alphanumericValidator]
      ));
    this.group.addControl('password',
      new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16),ValidationService.passwordValidator]
      ));
  }

  login() {
    this.schoFeatLoginStore.login(this.group.value);
  }
  openRegistation(): void {
    this.router.navigate(['/register']);
  }
}
