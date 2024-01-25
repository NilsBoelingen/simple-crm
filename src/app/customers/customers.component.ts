import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddCustomerDialogComponent } from '../add-customer-dialog/add-customer-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { Customer } from '../../models/customer.class';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { DeleteWarningDialogComponent } from '../delete-warning-dialog/delete-warning-dialog.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    CommonModule,
    RouterLink,
    MatMenuModule,
    DeleteWarningDialogComponent
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent {
  firestore: Firestore = inject(Firestore);
  unSubCustomers: any;
  allCustomers: any = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.unSubCustomers = onSnapshot(
      collection(this.firestore, 'customers'),
      (list) => {
        this.allCustomers = [];
        list.forEach((obj) => {
          let customer: Customer = obj.data() as any;
          customer['id'] = obj.id;
          this.allCustomers.push(customer);
        });
      }
    );
  }

  ngOnDestroy() {
    this.unSubCustomers();
  }

  openDialog() {
    const dialog = this.dialog.open(AddCustomerDialogComponent);
  }

  stopEvent(e: { stopPropagation: () => void; preventDefault: () => void }) {
    e.stopPropagation();
    e.preventDefault();
  }

  openDeleteDialog(i: number) {
    const dialog = this.dialog.open(DeleteWarningDialogComponent);
    dialog.componentInstance.allCustomers = this.allCustomers;
    dialog.componentInstance.i = i;
    dialog.componentInstance.customer = true;
  }
}
