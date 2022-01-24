import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
  collectionName = new FormControl('products');
  collection$: Observable<any>;

  constructor(private firestore: Firestore) {
    this.collection$ = collectionData(
      collection(this.firestore, this.collectionName.value)
    );
  }

  ngOnInit(): void {}

  getCollection() {
    this.collection$ = collectionData(
      collection(this.firestore, this.collectionName.value)
    );
  }
}
