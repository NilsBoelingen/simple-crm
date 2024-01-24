import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Customer } from '../../models/customer.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-customer-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule, MatProgressBarModule, NgIf],
  templateUrl: './add-customer-dialog.component.html',
  styleUrl: './add-customer-dialog.component.scss'
})
export class AddCustomerDialogComponent {
  firestore: Firestore = inject(Firestore);
  customer = new Customer();
  birthDate!: Date;
  loading: boolean = false;

  constructor() {

  }

  async saveCustomer() {
    this.customer.birthDate = this.birthDate ? this.birthDate.getTime() : 0;
    console.log(this.customer);
    this.loading = true;
    const docRef = await addDoc(collection(this.firestore, "customers"), this.customer.toJSON());
    this.loading = false;
  }
}
