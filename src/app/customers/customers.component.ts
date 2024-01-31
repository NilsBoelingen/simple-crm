import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddCustomerDialogComponent } from './add-customer-dialog/add-customer-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { DeleteWarningDialogComponent } from '../shared/components/delete-warning-dialog/delete-warning-dialog.component';
import { FirestoreService } from '../services/firestore/firestore.service';

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

  constructor(public dialog: MatDialog, public firestore: FirestoreService) {}

  getCustomer() {
    return this.firestore.allCustomers;
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
    dialog.componentInstance.allCustomers = this.firestore.allCustomers;
    dialog.componentInstance.i = i;
    dialog.componentInstance.customer = true;
  }
}
