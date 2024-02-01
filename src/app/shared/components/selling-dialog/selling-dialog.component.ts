import { Component, inject } from '@angular/core';
import { Customer } from '../../../../models/customer.class';
import { Product } from '../../../../models/product.class';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, onSnapshot, doc, addDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { SellProduct } from '../../../../models/sell-product.class';
import { FirestoreService } from '../../../services/firestore/firestore.service';

@Component({
  selector: 'app-selling-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './selling-dialog.component.html',
  styleUrl: './selling-dialog.component.scss',
})
export class SellingDialogComponent {

  fromCustomer: boolean = false;
  fromProduct: boolean = false;
  productId!: string;
  currentCustomer?: Customer;
  unSubProduct: any;
  i: number = -1;
  loading: boolean = false;
  customerId: string = '';

  constructor(public firestore: FirestoreService) {}

  ngOnInit(): void {
    this.firestore.sellingProduct.price = this.firestore.currentProduct.price;
  }

  getProductData() {
    this.firestore.getSingleProduct(this.productId);
  }

  async sellProduct() {
    this.firestore.sellProduct(this.customerId);
  }
}
