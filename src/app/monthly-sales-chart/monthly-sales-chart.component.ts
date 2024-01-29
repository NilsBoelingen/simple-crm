import { Component, ViewEncapsulation, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Chart, UpdateMode } from 'chart.js/auto';

@Component({
  selector: 'app-monthly-sales-chart',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [DashboardComponent],
  templateUrl: './monthly-sales-chart.component.html',
  styleUrl: './monthly-sales-chart.component.scss',
})
export class MonthlySalesChartComponent implements OnInit {
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

  monthlySalesChart: any = [];

  chart: any = [];

  constructor() {}

  async ngOnInit(): Promise<void> {
    if (DashboardComponent.loaded) {
      await this.getMonthlyPurchases();
      // console.log(this.monthlySalesChart);
      this.drawChart();
    } else {
      setTimeout(() => {
        this.ngOnInit();
      }, 50);
    }
  }

  drawChart() {
    this.chart = new Chart('canvas', {
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
              this.monthlySalesChart[0].sales,
              this.monthlySalesChart[1].sales,
              this.monthlySalesChart[2].sales,
              this.monthlySalesChart[3].sales,
              this.monthlySalesChart[4].sales,
              this.monthlySalesChart[5].sales,
              this.monthlySalesChart[6].sales,
              this.monthlySalesChart[7].sales,
              this.monthlySalesChart[8].sales,
              this.monthlySalesChart[9].sales,
              this.monthlySalesChart[10].sales,
              this.monthlySalesChart[11].sales,
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
        plugins: {
          title: {
            display: true,
            text: 'Monthly sales volume',
          },
        },
      },
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes[DashboardComponent.$yearInput]) {
      this.getMonthlyPurchases();
      this.drawChart();
    }
  }

  async getMonthlyPurchases() {
    this.monthlySalesChart = [];
    this.months.forEach((d) => {
      DashboardComponent.currentYearPurchases.forEach(
        (data: { total: number }) => {
          const existingMonth = DashboardComponent.currentYearPurchases.find(
            (data: { month: string }) => data.month === d
          );
          if (existingMonth) {
            this.monthlySalesChart.push({
              month: d,
              sales: existingMonth.total,
            });
          } else {
            this.monthlySalesChart.push({
              month: d,
              sales: 0,
            });
          }
        }
      );
    });
  }
}
