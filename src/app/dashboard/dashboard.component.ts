import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MonthlySalesChartComponent } from './monthly-sales-chart/monthly-sales-chart.component';
import { ProportionalSalesComponent } from './proportional-sales/proportional-sales.component';
import { LastSalesComponent } from './last-sales/last-sales.component';
import { BestProductsComponent } from './best-products/best-products.component';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepicker,
    MatDatepickerModule,
    FormsModule,
    CommonModule,
    MonthlySalesChartComponent,
    ProportionalSalesComponent,
    LastSalesComponent,
    BestProductsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  // currentYear: number = new Date().getFullYear();
  // chosenYearDate: number = new Date().getFullYear();
  static publicSelectedYear: number = new Date().getFullYear();
  // selectYear: any;

  constructor() {}

  // @ViewChild('picker', { static: false })
  // private picker!: MatDatepicker<Date>;

  // chosenYearHandler(ev: Date, input: any){
  //   let year = ev.getFullYear();
  //   this.chosenYearDate = year;
  //   this.picker.close()
  // }
}
