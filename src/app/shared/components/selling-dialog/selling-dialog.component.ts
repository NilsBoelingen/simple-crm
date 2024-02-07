import { Component } from '@angular/core';
import { Customer } from '../../../../models/customer.class';
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
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../../services/firestore/firestore.service';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
  productId!: string;
  currentCustomer?: Customer;
  unSubProduct: any;
  i: number = -1;
  loading: boolean = false;
  customerId: string = '';
  showError: boolean = false;
  selling!: FormGroup<any>;

  constructor(public firestore: FirestoreService) {}

  ngOnInit(): void {
    this.firestore.sellingProduct.price = this.firestore.currentProduct.price;
    this.selling = new FormGroup({
      product: new FormControl('', [Validators.required, Validators.minLength(1)]),
      value: new FormControl('', [Validators.required, Validators.min(1)]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      customer: new FormControl('', [Validators.required, Validators.minLength(1)]),
      });
  }

  getProductData() {
    this.firestore.getSingleProduct(this.productId);
  }

  async sellProduct() {
    // this.firestore.sellProduct(this.customerId);
    console.log(this.selling);

  }
}
