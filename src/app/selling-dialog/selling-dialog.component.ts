import { Component, inject } from '@angular/core';
import { Customer } from '../../models/customer.class';
import { Product } from '../../models/product.class';
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
import { SellProduct } from '../../models/sell-product.class';

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
  firestore: Firestore = inject(Firestore);
  fromCustomer: boolean = false;
  fromProduct: boolean = false;
  customerId?: string;
  productId!: string;
  currentCustomer?: Customer;
  currentProduct: Product = new Product();
  allCustomers: any = [];
  allProducts: any = [];
  unSubProducts: any;
  unSubCustomers: any;
  unSubProduct: any;
  i: number = -1;
  sellingProduct: SellProduct = new SellProduct();
  loading: boolean = false;

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
    this.unSubCustomers = onSnapshot(
      collection(this.firestore, 'customers'),
      (list) => {
        this.allCustomers = [];
        list.forEach((obj) => {
          let customer: Customer = new Customer(obj.data());
          customer['id'] = obj.id;
          this.allCustomers.push(customer);
        });
      }
    );
    this.sellingProduct.price = this.currentProduct.price;
  }

  ngOnDestroy() {
    this.unSubProducts();
    this.unSubCustomers();
  }

  getProductData() {
    this.unSubProduct = onSnapshot(doc(this.firestore, 'products', this.productId), (product) => {
      this.currentProduct = new Product(product.data());
      this.sellingProduct.price = this.currentProduct.price;
    });
  }

  async sellProduct() {
    this.loading = true;
    this.sellingProduct.name = this.currentProduct.name;
    this.sellingProduct.date = new Date().getTime();
    const docRef = await addDoc(collection(this.firestore, `customers/${this.customerId}/purchases`), this.sellingProduct.toJSON());
    this.loading = false;
  }
}
