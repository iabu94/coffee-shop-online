import { Component, OnInit } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
  customerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private router: Router
  ) {}

  ngOnInit(): void {}

  create() {
    const collectionRef = collection(this.firestore, 'customers');
    addDoc(collectionRef, this.customerForm.value).then(() =>
      this.router.navigateByUrl('/customers')
    );
  }
}
