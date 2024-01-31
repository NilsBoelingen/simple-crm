import { Component, inject } from '@angular/core';
import { DashboardComponent } from '../dashboard.component';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-last-sales',
  standalone: true,
  imports: [DashboardComponent, MatCardModule, CommonModule],
  templateUrl: './last-sales.component.html',
  styleUrl: './last-sales.component.scss',
})
export class LastSalesComponent {
  firestore: Firestore = inject(Firestore);
  unSubPurchases: any;

  purchases: any = [];
  lastPurchases: any[] = [];
  displayedColumns: string[] = ['position', 'name', 'product', 'total'];

  ngOnInit() {
    if (DashboardComponent.loaded) {
      this.getPurchasesPerCustomer();
    } else {
      setTimeout(() => {
        this.ngOnInit();
      }, 50);
    }
  }

  async getPurchasesPerCustomer() {
    this.purchases = [];
    await DashboardComponent.allCustomers.forEach(
      (customer: { id: string; firstName: string; lastName: string }) => {
        let name = customer.firstName + ' ' + customer.lastName;
        this.unSubPurchases = onSnapshot(
          collection(this.firestore, `customers/${customer.id}/purchases`),
          (list) => {
            list.forEach((data) => {
              let purchaseData = data.data();
              let purchaseDate = purchaseData['date'];
              this.purchases.push({
                name: name,
                date: purchaseDate,
                product: purchaseData['name'],
                total: purchaseData['price'] * purchaseData['value'],
              });
            });
            this.lastSalesToArray();
          }
        );
      }
    );
  }

  lastSalesToArray() {
    this.lastPurchases = [];
    let i = 0;
    this.sortByDate(this.purchases);
    this.purchases.forEach(
      (element: {
        name: string;
        date: Date;
        product: string;
        total: number;
      }) => {
        if (i < 10) {
          this.lastPurchases.push({
            index: i + 1,
            name: element.name,
            date: new Date(element.date).toLocaleDateString('de-DE'),
            product: element.product,
            total: element.total,
          });
          i++;
        }
      }
    );
  }

  sortByDate(array: any[]) {
    array.sort((a, b) => b.date - a.date);
  }

  ngOnDestroy() {
    this.unSubPurchases();
  }
}
