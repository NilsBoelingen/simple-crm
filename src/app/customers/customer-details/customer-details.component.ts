import { Component, inject } from '@angular/core';
import {
  Firestore,
  doc,
  onSnapshot,
  collection,
  updateDoc,
} from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../../models/customer.class';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditAddressDialogComponent } from '../edit-address-dialog/edit-address-dialog.component';
import { EditNameDialogComponent } from '../edit-name-dialog/edit-name-dialog.component';
import { CommonModule } from '@angular/common';
import { SellProduct } from '../../../models/sell-product.class';
import { SellingDialogComponent } from '../../shared/components/selling-dialog/selling-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss',
})
export class CustomerDetailsComponent {
  loading: boolean = false;
  customerId: string = '';

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public firestore: FirestoreService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.customerId = paramMap.get('id')!.toString();
    });
    this.firestore.subCustomer(this.customerId);
    this.firestore.subCustomerPurchases(this.customerId);
  }

  getPurchases() {
    return this.firestore.CustomerPurchases;
  }

  getDate(date: number) {
    return new Date(date).toLocaleDateString('de-DE');
  }

  getTotalVolume() {
    let total = 0;

    this.firestore.CustomerPurchases.forEach(
      (purchase: { value: number; price: number }) => {
        total += purchase.value * purchase.price;
      }
    );

    return total;
  }

  editCustomerAddress() {
    const dialog = this.dialog.open(EditAddressDialogComponent);
    dialog.componentInstance.customer = new Customer(
      this.firestore.customer.toJSON()
    );
    dialog.componentInstance.customerId = this.customerId;
  }

  editCustomerName() {
    const dialog = this.dialog.open(EditNameDialogComponent);
    dialog.componentInstance.customer = new Customer(
      this.firestore.customer.toJSON()
    );
    dialog.componentInstance.customerId = this.customerId;
  }

  openSellingDialog() {
    const dialog = this.dialog.open(SellingDialogComponent);
    dialog.componentInstance.currentCustomer = new Customer(
      this.firestore.customer
    );
    dialog.componentInstance.customerId = this.customerId;
    dialog.componentInstance.fromCustomer = true;
  }
}
