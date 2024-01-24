import { Component, inject } from '@angular/core';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../models/customer.class';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditAddressDialogComponent } from '../edit-address-dialog/edit-address-dialog.component';
import { EditNameDialogComponent } from '../edit-name-dialog/edit-name-dialog.component';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatMenuModule, MatDialogModule],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent {
  firestore: Firestore = inject(Firestore);
  customerId: string = '';
  unSubCustomer: any;
  customer: Customer = new Customer();

  constructor(public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.customerId = paramMap.get('id')!.toString();
      this.getCustomer();
    })
  }

  ngOnDestroy() {
    this.unSubCustomer();
  }

  getCustomer() {
    this.unSubCustomer = onSnapshot(doc(this.firestore, 'customers', this.customerId), (customer) => {
      this.customer = new Customer(customer.data());
    });
  }

  editCustomerAddress() {
    const dialog = this.dialog.open(EditAddressDialogComponent);
    dialog.componentInstance.customer = new Customer(this.customer.toJSON());
    dialog.componentInstance.customerId = this.customerId;
  }

  editCustomerName() {
    const dialog = this.dialog.open(EditNameDialogComponent);
    dialog.componentInstance.customer = new Customer(this.customer.toJSON());
    dialog.componentInstance.customerId = this.customerId;
  }
}
