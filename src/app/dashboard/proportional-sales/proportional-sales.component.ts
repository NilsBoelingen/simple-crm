import { Component, inject } from '@angular/core';
import { DashboardComponent } from '../dashboard.component';
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

  proportionalSalesChart: any = [];
  purchases: any = [];
  purchasesPerCustomer: any = [];

  loaded: boolean = false;

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
}
