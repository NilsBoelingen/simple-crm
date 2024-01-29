import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {
  CategoryService,
  ChartModule,
  DataLabelService,
  LegendService,
  LineSeriesService,
  TooltipService,
} from '@syncfusion/ej2-angular-charts';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-monthly-sales-chart',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  providers: [
    CategoryService,
    LegendService,
    TooltipService,
    DataLabelService,
    LineSeriesService,
  ],
  imports: [ChartModule, DashboardComponent],
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

  public primaryXAxis?: Object;
  public chartData?: Object[];
  constructor() {

  }

  ngOnInit(): void {
    setTimeout(() => {
      console.log(DashboardComponent.currentYearPurchases);
      this.chartData = this.getMonthlyPurchases();
      this.primaryXAxis = {
        valueType: 'Category',
      };
    }, 500);



  }

  getMonthlyPurchases(): Object[] {
    const result: Object[] = [];
    this.months.forEach((d) => {
      DashboardComponent.currentYearPurchases.forEach((data: { total: number; }) => {
        const existingMonth = DashboardComponent.allPurchases.find(
          (data: { month: string }) => data.month === d
        );
        if (existingMonth) {
          console.log('true');

          this.chartData?.push({
            month: d,
            sales: data.total
          })
        } else {
          console.log('false');

          this.chartData?.push({
            month: d,
            sales: 0
          })
        }
        console.log(this.chartData);

      });
    })
    return result;
  }
}
