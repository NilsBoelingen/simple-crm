import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { DashboardComponent } from '../dashboard.component';
import { Chart } from 'chart.js/auto';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-monthly-sales-chart',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [DashboardComponent],
  templateUrl: './monthly-sales-chart.component.html',
  styleUrl: './monthly-sales-chart.component.scss',
})
export class MonthlySalesChartComponent implements OnInit, OnDestroy {
  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  monthlySort: { [key: string]: number } = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  monthlySalesChart: any = [];
  currentYearPurchases: any[] = [];
  salesChart: any = [];
  chartDrawed = false;
  subscription: any;

  constructor(public router: Router, public firestore: FirestoreService) {}

  async ngOnInit() {
    this.subscription = this.firestore.currentYearPurchasesSubject.subscribe(
      async (purchases) => {
        this.currentYearPurchases = purchases;
        this.getMonthlyPurchases();
        this.fillEmptyMonth();
        this.sortByMonth(this.monthlySalesChart);
        if (this.chartDrawed) {
          this.salesChart.destroy();
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

    if (this.salesChart) {
      this.salesChart.destroy();
    }
  }

  drawChart() {
    this.salesChart = new Chart('salesChart', {
      type: 'bar',
      data: {
        labels: [
          this.monthlySalesChart[0].month,
          this.monthlySalesChart[1].month,
          this.monthlySalesChart[2].month,
          this.monthlySalesChart[3].month,
          this.monthlySalesChart[4].month,
          this.monthlySalesChart[5].month,
          this.monthlySalesChart[6].month,
          this.monthlySalesChart[7].month,
          this.monthlySalesChart[8].month,
          this.monthlySalesChart[9].month,
          this.monthlySalesChart[10].month,
          this.monthlySalesChart[11].month,
        ],
        datasets: [
          {
            label: 'Sales in €',
            data: [
              this.monthlySalesChart[0].total,
              this.monthlySalesChart[1].total,
              this.monthlySalesChart[2].total,
              this.monthlySalesChart[3].total,
              this.monthlySalesChart[4].total,
              this.monthlySalesChart[5].total,
              this.monthlySalesChart[6].total,
              this.monthlySalesChart[7].total,
              this.monthlySalesChart[8].total,
              this.monthlySalesChart[9].total,
              this.monthlySalesChart[10].total,
              this.monthlySalesChart[11].total,
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        aspectRatio: 2 | 2,
        maintainAspectRatio: true,
        responsive: true,
        resizeDelay: 300,
        backgroundColor: '#36A2EB',
        plugins: {
          title: {
            font: {
              size: 16,
            },
            display: true,
            text: 'Monthly sales volume',
          },
          legend: {
            display: false,
          },
        },
      },
    });
  }

  getMonthlyPurchases() {
    this.monthlySalesChart = [];
    this.currentYearPurchases.forEach(
      (data: { month: string; total: number }) => {
        const existingMonth = this.monthlySalesChart.find(
          (date: { month: string }) => date.month === data.month
        );
        if (existingMonth) {
          existingMonth.total += data.total;
        } else {
          this.monthlySalesChart.push({
            month: data.month,
            total: data.total,
          });
        }
      }
    );
  }

  fillEmptyMonth() {
    this.months.forEach((data) => {
      const existingMonth = this.monthlySalesChart.find(
        (date: { month: string }) => date.month === data
      );
      if (!existingMonth) {
        this.monthlySalesChart.push({
          month: data,
          total: 0,
        });
      }
    });
  }

  sortByMonth(array: any) {
    array.sort(
      (a: { month: string | number }, b: { month: string | number }) =>
        this.monthlySort[a.month] - this.monthlySort[b.month]
    );
  }
}
