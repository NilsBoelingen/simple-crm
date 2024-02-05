import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-proportional-sales',
  standalone: true,
  imports: [],
  templateUrl: './proportional-sales.component.html',
  styleUrl: './proportional-sales.component.scss',
})
export class ProportionalSalesComponent implements OnInit, OnDestroy {
  proportionalSalesChart: any = [];
  purchases: any = [];
  purchasesPerCustomer: any = [];
  currentYearPurchases: any[] = [];
  chartDrawed = false;
  chartNames: string[] = [];
  chartTotals: number[] = [];
  subscription: any;

  constructor(public firestore: FirestoreService) {}

  ngOnInit() {
    this.subscription = this.firestore.currentYearPurchasesSubject.subscribe(
      (purchases) => {
        this.currentYearPurchases = purchases;
        this.sortPurchases();
        this.fillChartData();
        if (this.chartDrawed) {
          this.proportionalSalesChart.destroy();
          this.drawChart();
        } else {
          this.drawChart();
          this.chartDrawed = true;
        }
      }
    );

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.proportionalSalesChart) {
      this.proportionalSalesChart.destroy();
    }
  }

  drawChart() {
    this.proportionalSalesChart = new Chart('proportionalSalesChart', {
      type: 'pie',
      data: {
        labels: this.chartNames,
        datasets: [
          {
            label: 'Sales in €',
            data: this.chartTotals,
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
            },
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
            },
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
          legend: {
            display: true,
            position: 'right',
            maxWidth: 200,
          }
        },
      },
    });
  }

  sortPurchases() {
    this.purchasesPerCustomer = [];
    this.currentYearPurchases.forEach(
      (purchase: { name: string; total: number; year: number }) => {
        let existingEntry = this.purchasesPerCustomer.find(
          (data: { name: string }) => data.name === purchase.name
        );
        if (existingEntry) {
          existingEntry.total += purchase.total;
        } else {
          this.purchasesPerCustomer.push({
            name: purchase.name,
            total: purchase.total,
          });
        }
      }
    );
  }

  fillChartData() {
    this.chartNames = [];
    this.chartTotals = [];
    this.purchasesPerCustomer.forEach((customer: { name: string; total: number; }) => {
      this.chartNames.push(customer.name);
      this.chartTotals.push(customer.total);
    });
  }
}
