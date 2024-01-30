import { Component, inject } from '@angular/core';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-best-products',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './best-products.component.html',
  styleUrl: './best-products.component.scss'
})
export class BestProductsComponent {
  firestore: Firestore = inject(Firestore);
  unSubPurchases: any;

  purchases: any[] = [];

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
              this.purchases.push({
                name: purchaseData['name'],
                volume: +purchaseData['value'],
                price: +purchaseData['price'],
              });
            });
            console.log(this.purchases);

          }
        );
      }
    );
  }

  getSalesValue() {
    // errechnet die gesamte Verkaufmenge pro Produkt und speichert es in einem Array
  }

  ngOnDestroy() {
    this.unSubPurchases();
  }
}
