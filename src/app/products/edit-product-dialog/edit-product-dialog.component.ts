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
import { Product } from '../../../models/product.class';
import { FirestoreService } from '../../services/firestore/firestore.service';

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
  product!: Product;
  productID!: string;

  constructor(public firestore: FirestoreService) {}

  async saveEditProduct() {
    this.firestore.saveEditProduct(this.productID, this.product);
  }
}
