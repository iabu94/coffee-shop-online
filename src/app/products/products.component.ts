import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(firestore: Firestore) {
    this.products$ = collectionData(
      collection(firestore, 'products')
    ) as Observable<Product[]>;
  }

  ngOnInit(): void {}
}
