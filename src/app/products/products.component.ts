import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { Product } from '../../models/product.class';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  firestore: Firestore = inject(Firestore);
  unSubProducts: any;
  allProducts: any = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.unSubProducts = onSnapshot(
      collection(this.firestore, 'products'),
      (list) => {
        this.allProducts = [];
        list.forEach((obj) => {
          let product: Product = new Product(obj.data());
          product['id'] = obj.id;
          this.allProducts.push(product);
        });
      }
    );
  }

  openDialog() {
    this.dialog.open(AddProductDialogComponent);
  }
}
