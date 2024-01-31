import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-add-customer-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule, MatProgressBarModule, NgIf],
  templateUrl: './add-customer-dialog.component.html',
  styleUrl: './add-customer-dialog.component.scss'
})
export class AddCustomerDialogComponent {

  constructor(public firestore: FirestoreService) {}
}
