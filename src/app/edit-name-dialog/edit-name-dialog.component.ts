import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { Firestore, doc, updateDoc, collection } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-edit-name-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter(), Firestore],
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatFormFieldModule, MatInputModule, FormsModule, MatProgressBarModule, NgIf, MatDatepickerModule],
  templateUrl: './edit-name-dialog.component.html',
  styleUrl: './edit-name-dialog.component.scss'
})
export class EditNameDialogComponent {
  firestore: Firestore = inject(Firestore);
  loading: boolean = false;
  user: User = new User();
  birthDate: Date = new Date();
  userId: string = '';

  ngOnInit(): void {
    this.birthDate = new Date(this.user.birthDate);
  }

  async saveEdits() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    await updateDoc(doc(collection(this.firestore, 'users'), this.userId), this.user.toJSON())
    .then(() => {
      this.loading = false;
    });
  }
}
