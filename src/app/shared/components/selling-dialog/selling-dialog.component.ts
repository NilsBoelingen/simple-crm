import { Component } from '@angular/core';
import { Customer } from '../../../../models/customer.class';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
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
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../../services/firestore/firestore.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './selling-dialog.component.html',
  styleUrl: './selling-dialog.component.scss',
})
export class SellingDialogComponent {

  fromCustomer: boolean = false;
  fromProduct: boolean = false;
  productId: any = '';
  currentCustomer?: Customer;
  unSubProduct: any;
  i: number = -1;
  loading: boolean = false;
  customerId: any = '';
  showError: boolean = false;
  enableBtn: boolean = false;

  constructor(public firestore: FirestoreService, private dialogRef: MatDialogRef<SellingDialogComponent >) {}

  ngOnInit(): void {
    this.firestore.sellingProduct.price = this.firestore.currentProduct.price;
  }

  getProductData() {
    this.firestore.getSingleProduct(this.productId);
  }

  async sellProduct() {
    if (this.checkInput()) {
      this.firestore.sellProduct(this.customerId);
      this.dialogRef.close();
    }
  }

  checkInput() {
    return this.productId && this.customerId && this.firestore.sellingProduct.value as number > 0 && +this.firestore.sellingProduct.price as number > 0
  }
}
