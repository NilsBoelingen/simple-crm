import { Product } from './../../models/product.class';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Customer } from '../../models/customer.class';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MonthlySalesChartComponent } from './monthly-sales-chart/monthly-sales-chart.component';
import { ProportionalSalesComponent } from './proportional-sales/proportional-sales.component';
import { LastSalesComponent } from './last-sales/last-sales.component';
import { BestProductsComponent } from './best-products/best-products.component';
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MonthlySalesChartComponent,
    ProportionalSalesComponent,
    LastSalesComponent,
    BestProductsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  selectedYear: number = new Date().getFullYear();

  static currentYearPurchases: any = [];
  static loaded: boolean = false;
  static $yearInput: any;
  static publicSelectedYear: number = new Date().getFullYear();

  constructor(public firestore: FirestoreService) {}

  async getAllPurchases() {
    DashboardComponent.currentYearPurchases = [];
    this.firestore.allPurchases.forEach((purchase: any) => {
      let purchaseMonth = this.getMonthLabel(purchase.date.getMonth());
      let purchaseYear = purchase.date.getFullYear();
      const existingMonth = DashboardComponent.currentYearPurchases.find(
        (data: { month: string }) => data.month === purchaseMonth
      );
      const existingYear = DashboardComponent.currentYearPurchases.find(
        (data: { year: number }) => data.year === purchaseYear
      );
      if (purchaseYear === DashboardComponent.publicSelectedYear) {
        if (existingYear) {
          if (existingMonth) {
            existingMonth.total += purchase['price'] * purchase['value'];
          } else {
            DashboardComponent.currentYearPurchases.push({
              product: purchase['product'],
              name: purchase['name'],
              year: purchaseYear,
              month: purchaseMonth,
              total: purchase['price'] * purchase['value'],
            });
          }
        } else {
          DashboardComponent.currentYearPurchases.push({
            product: purchase['product'],
            name: purchase['name'],
            year: purchaseYear,
            month: purchaseMonth,
            total: purchase['price'] * purchase['value'],
          });
        }
      }
    });
  }

  checkValue(event: any) {
    this.selectedYear = +event;
    DashboardComponent.publicSelectedYear = +event;
  }

  getMonthLabel(month: number): string {
    const months = [
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
    return months[month];
  }
}
