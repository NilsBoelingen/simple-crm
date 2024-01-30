import { Component, inject } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Chart } from 'chart.js/auto';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-proportional-sales',
  standalone: true,
  imports: [],
  templateUrl: './proportional-sales.component.html',
  styleUrl: './proportional-sales.component.scss',
})
export class ProportionalSalesComponent {
  firestore: Firestore = inject(Firestore);

  unSubPurchases: any;

  proportionalSalesChart: any = [];
  purchases: any = [];
  purchasesPerCustomer: any = [];

  loaded: boolean = false;

  async ngOnInit(): Promise<void> {
    await this.getPurchasesPerCustomer();
    if (this.loaded) {
      this.drawChart();
    } else {
      setTimeout(() => {
        this.ngOnInit();
      }, 50);
    }
  }

  drawChart() {
    this.proportionalSalesChart = new Chart('proportionalSalesChart', {
      type: 'pie',
      data: {
        labels: [
          this.purchasesPerCustomer[0].name as string,
          this.purchasesPerCustomer[1].name as string,
        ],
        datasets: [
          {
            label: 'Sales in €',
            data: [
              this.purchasesPerCustomer[0].total as number,
              this.purchasesPerCustomer[1].total as number,
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            border: {
              display: false,
            },
            ticks: {
              display: false,
            },
            beginAtZero: true,
            grid: {
              display: false,
            }
          },
          x: {
            border: {
              display: false,
            },
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            }
          },
        },

        aspectRatio: 2 | 2,
        maintainAspectRatio: true,
        responsive: true,
        resizeDelay: 300,
        plugins: {
          title: {
            font: {
              size: 16,
            },
            display: true,
            text: 'Proportional Sales',
          },
        },
      },
    });
  }

  async getPurchasesPerCustomer() {
    await DashboardComponent.allCustomers.forEach(
      (customer: { id: string; firstName: string; lastName: string }) => {
        let name = customer.firstName + ' ' + customer.lastName;
        this.unSubPurchases = onSnapshot(
          collection(this.firestore, `customers/${customer.id}/purchases`),
          (list) => {
            list.forEach((data) => {
              let purchaseData = data.data();
              let purchaseYear = new Date(purchaseData['date']).getFullYear();
              this.purchases.push({
                name: name,
                year: purchaseYear,
                total: purchaseData['price'] * purchaseData['value'],
              });
            });
            this.sortPurchases();
          }
        );
      }
    );
  }

  async sortPurchases() {
    this.purchasesPerCustomer = [];
    await this.purchases.forEach(
      (purchase: { name: string; total: number; year: number }) => {
        let existingEntry = this.purchasesPerCustomer.find(
          (data: { name: string }) => data.name === purchase.name
        );
        if (purchase.year === DashboardComponent.publicSelectedYear) {
          if (existingEntry) {
            existingEntry.total += purchase.total;
          } else {
            this.purchasesPerCustomer.push({
              name: purchase.name,
              total: purchase.total,
            });
          }
        }
        this.loaded = true;
      }
    );
  }

  ngOnDestroy() {
    this.unSubPurchases();
  }
}
