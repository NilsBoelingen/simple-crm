import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { Product } from '../../../models/product.class';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-add-product-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatFormFieldModule, MatInputModule, FormsModule, MatProgressBarModule, NgIf],
  templateUrl: './add-product-dialog.component.html',
  styleUrl: './add-product-dialog.component.scss'
})
export class AddProductDialogComponent {
  newProduct: Product = new Product();

  constructor(public firestore: FirestoreService) {}

  async saveProduct() {
    this.firestore.saveNewProduct(this.newProduct);
  }
}
