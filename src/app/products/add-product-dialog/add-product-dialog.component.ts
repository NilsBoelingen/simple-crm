import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Product } from '../../../models/product.class';

@Component({
  selector: 'app-add-product-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatFormFieldModule, MatInputModule, FormsModule, MatProgressBarModule, NgIf],
  templateUrl: './add-product-dialog.component.html',
  styleUrl: './add-product-dialog.component.scss'
})
export class AddProductDialogComponent {
  firestore: Firestore = inject(Firestore);
  product: Product = new Product();
  loading: boolean = false;

  async saveProduct() {
    this.loading = true;
    const docRef = await addDoc(collection(this.firestore, "products"), this.product.toJSON());
    this.loading = false;
  }
}
