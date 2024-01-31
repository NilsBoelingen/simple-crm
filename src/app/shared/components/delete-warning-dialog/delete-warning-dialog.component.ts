import { Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Firestore, doc, deleteDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

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
  firestore: Firestore = inject(Firestore);
  allCustomers: any = [];
  i: number = -1;
  customer: boolean = false;
  product: boolean = false;
  allProducts: any = [];

  constructor(public dialogRef: MatDialogRef<DeleteWarningDialogComponent>) {}

  async deleteUser() {
    await deleteDoc(
      doc(this.firestore, 'customers', this.allCustomers[this.i].id)
    );
    this.customer = false;
  }

  async deleteProduct() {
    await deleteDoc(doc(this.firestore, 'products', this.allProducts[this.i].id));
    this.product = false;
  }
}
