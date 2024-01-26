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
import { MatMenuModule } from '@angular/material/menu';
import { DeleteWarningDialogComponent } from '../delete-warning-dialog/delete-warning-dialog.component';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
import { SellingDialogComponent } from '../selling-dialog/selling-dialog.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, CommonModule, MatMenuModule],
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

  ngOnDestroy() {
    this.unSubProducts();
  }

  openDialog() {
    this.dialog.open(AddProductDialogComponent);
  }

  openWarningDialog(i: number) {
    const dialog = this.dialog.open(DeleteWarningDialogComponent);
    dialog.componentInstance.allProducts = this.allProducts;
    dialog.componentInstance.i = i;
    dialog.componentInstance.product = true;
  }

  openEditDialog(i: number) {
    const dialog = this.dialog.open(EditProductDialogComponent);
    dialog.componentInstance.product = new Product(this.allProducts[i].toJSON());
    dialog.componentInstance.productID = this.allProducts[i].id;
  }

  openSellingDialog(i: number) {
    const dialog = this.dialog.open(SellingDialogComponent);
    dialog.componentInstance.currentProduct = new Product(this.allProducts[i].toJSON());
    dialog.componentInstance.productId = this.allProducts[i].id;
    dialog.componentInstance.i = i;
    dialog.componentInstance.fromProduct = true;
  }
}
