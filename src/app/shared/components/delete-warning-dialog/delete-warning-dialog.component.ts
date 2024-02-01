import { Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../../services/firestore/firestore.service';

@Component({
  selector: 'app-delete-warning-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    CommonModule,
  ],
  templateUrl: './delete-warning-dialog.component.html',
  styleUrl: './delete-warning-dialog.component.scss',
})
export class DeleteWarningDialogComponent {
  allCustomers: any = [];
  i: number = -1;
  customer: boolean = false;
  product: boolean = false;
  allProducts: any = [];

  constructor(public dialogRef: MatDialogRef<DeleteWarningDialogComponent>, public firestore: FirestoreService) {}

  async deleteUser() {
    this.firestore.deleteUser(this.i)
    this.customer = false;
  }

  async deleteProduct() {
    this.firestore.deleteProduct(this.i)
    this.product = false;
  }
}
