import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-add-customer-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule, MatProgressBarModule, NgIf, ReactiveFormsModule],
  templateUrl: './add-customer-dialog.component.html',
  styleUrl: './add-customer-dialog.component.scss'
})
export class AddCustomerDialogComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  firstName = new FormControl('', [Validators.required])
  lastName = new FormControl('', [Validators.required])
  city = new FormControl('', [Validators.required])
  zipCode = new FormControl('', [Validators.required, Validators.min(5), Validators.max(5)])
  address = new FormControl('', [Validators.required])
  telephone = new FormControl('', [Validators.required, Validators.min(8)])

  constructor(public firestore: FirestoreService) {}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
