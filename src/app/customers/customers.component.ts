import { Component, OnInit } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  customers$: Observable<Customer[]>;

  constructor(private firestore: Firestore, private router: Router) {
    this.customers$ = collectionData(collection(firestore, 'customers'), {
      idField: 'id',
    }) as Observable<Customer[]>;
  }

  ngOnInit(): void {}

  deleteCustomer(id: string) {
    const customerRef = doc(this.firestore, 'customers', id);
    deleteDoc(customerRef).then(() => console.log('success'));
  }

  editCustomer(id: string) {
    this.router.navigateByUrl(`edit-customer/${id}`);
  }
}
