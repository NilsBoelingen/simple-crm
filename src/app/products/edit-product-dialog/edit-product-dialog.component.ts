import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { Firestore, updateDoc, doc, collection } from '@angular/fire/firestore';
import { Product } from '../../../models/product.class';

@Component({
  selector: 'app-edit-product-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatProgressBarModule,
    NgIf,
  ],
  templateUrl: './edit-product-dialog.component.html',
  styleUrl: './edit-product-dialog.component.scss',
})
export class EditProductDialogComponent {
  firestore: Firestore = inject(Firestore);
  product!: Product;
  productID!: string;
  loading: boolean = false;

  async saveEditProduct() {
    this.loading = true;
    await updateDoc(
      doc(collection(this.firestore, 'products'), this.productID),
      this.product.toJSON()
    ).then(() => {
      this.loading = false;
    });
  }
}
