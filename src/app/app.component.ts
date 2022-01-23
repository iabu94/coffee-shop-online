import { Component } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'coffee-shop-online';

  products$: Observable<Product[]>;

  constructor(firestore: Firestore) {
    const collection1 = collection(firestore, 'products');
    this.products$ = collectionData(collection1) as Observable<Product[]>;
    this.products$.subscribe((data) => console.log(data));
  }
}
