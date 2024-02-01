import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Product } from '../../models/product.class';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { DeleteWarningDialogComponent } from '../shared/components/delete-warning-dialog/delete-warning-dialog.component';
import { EditProductDialogComponent } from './edit-product-dialog/edit-product-dialog.component';
import { SellingDialogComponent } from '../shared/components/selling-dialog/selling-dialog.component';
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, CommonModule, MatMenuModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {


  constructor(public dialog: MatDialog, public firestore: FirestoreService) {}

  openDialog() {
    this.dialog.open(AddProductDialogComponent);
  }

  openWarningDialog(i: number) {
    const dialog = this.dialog.open(DeleteWarningDialogComponent);
    dialog.componentInstance.allProducts = this.firestore.productList;
    dialog.componentInstance.i = i;
    dialog.componentInstance.product = true;
  }

  openEditDialog(i: number) {
    const dialog = this.dialog.open(EditProductDialogComponent);
    dialog.componentInstance.product = new Product(this.firestore.productList[i].toJSON());
    dialog.componentInstance.productID = this.firestore.productList[i].id;
  }

  openSellingDialog(i: number) {
    const dialog = this.dialog.open(SellingDialogComponent);
    dialog.componentInstance.firestore.currentProduct = new Product(this.firestore.productList[i].toJSON());
    dialog.componentInstance.productId = this.firestore.productList[i].id;
    dialog.componentInstance.i = i;
    dialog.componentInstance.fromProduct = true;
  }
}
