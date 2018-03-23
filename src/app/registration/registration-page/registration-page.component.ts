import { Component, ChangeDetectionStrategy,Inject, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'schofeat-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationPageComponent implements OnInit {
  
  registraionGroup: FormGroup;
  addressGroup: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(){
    this.registraionGroup = this.fb.group({});
    this.addressGroup = this.fb.group({});
  }
  onCancel(){
    this.router.navigate(['/']);
  }
  register(){
    this.router.navigate(['/dashboard']);
  }

}
