import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { Firestore, updateDoc, doc, collection } from '@angular/fire/firestore';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-edit-address-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatFormFieldModule, MatInputModule, FormsModule, MatProgressBarModule, NgIf],
  templateUrl: './edit-address-dialog.component.html',
  styleUrl: './edit-address-dialog.component.scss'
})
export class EditAddressDialogComponent {
  firestore: Firestore = inject(Firestore);
  loading: boolean = false;
  user!: User;
  userId!: string;

  async saveEdits() {
    this.loading = true;
    await updateDoc(doc(collection(this.firestore, 'users'), this.userId), this.user.toJSON())
    .then(() => {
      this.loading = false;
    });
  }

}
