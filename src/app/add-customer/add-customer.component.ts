import { Component, OnInit } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  docData,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  id: string | null;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!!this.id) {
      const customerRef = doc(this.firestore, 'customers', this.id);
      docData(customerRef, { idField: this.id }).subscribe((data) =>
        this.customerForm.patchValue(data)
      );
    }
  }

  ngOnInit(): void {}

  create() {
    if (!this.id) {
      const collectionRef = collection(this.firestore, 'customers');
      addDoc(collectionRef, this.customerForm.value).then(() =>
        this.router.navigateByUrl('/customers')
      );
    } else {
      const customerRef = doc(this.firestore, 'customers', this.id);
      updateDoc(customerRef, this.customerForm.value).then(() =>
        this.router.navigateByUrl('/customers')
      );
    }
  }
}
