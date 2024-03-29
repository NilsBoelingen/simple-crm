import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { Customer } from '../../../models/customer.class';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-edit-name-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatFormFieldModule, MatInputModule, FormsModule, MatProgressBarModule, NgIf, MatDatepickerModule],
  templateUrl: './edit-name-dialog.component.html',
  styleUrl: './edit-name-dialog.component.scss'
})

export class EditNameDialogComponent {
  loading: boolean = false;
  customer!: Customer;
  birthDate!: Date;
  customerId!: string;

  constructor(public firestore: FirestoreService) {}

  ngOnInit(): void {
    this.birthDate = new Date(this.customer.birthDate);
  }

  async saveEdits() {
    this.loading = true;
    this.customer.birthDate = this.birthDate.getTime();
    this.firestore.saveCustomerEdits(this.customerId, this.customer);
  }
}
