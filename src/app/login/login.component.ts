import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  loginSuccess = true;

  constructor(
    private firestore: Firestore,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  get f() {
    return this.loginForm.controls;
  }

  login() {
    (
      collectionData(collection(this.firestore, 'customers')) as Observable<
        Customer[]
      >
    )
      .pipe(
        map((cus) =>
          cus.find(
            (c) =>
              c.username === this.f['username'].value &&
              c.password === this.f['password'].value
          )
        )
      )
      .subscribe((customer) => {
        if (!!customer) {
          this.loginSuccess = true;
          localStorage.setItem('customer', customer.firstName);
          this.router.navigateByUrl('/customers');
        } else {
          this.loginSuccess = false;
        }
      });
  }
}
