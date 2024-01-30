import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { Customer } from '../../models/customer.class';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MonthlySalesChartComponent } from '../monthly-sales-chart/monthly-sales-chart.component';
import { ProportionalSalesComponent } from '../proportional-sales/proportional-sales.component';
import { LastSalesComponent } from '../last-sales/last-sales.component';

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
    LastSalesComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  firestore: Firestore = inject(Firestore);
  unSubCustomers: any;
  unSubPurchases: any;
  static allCustomers: any = [];
  selectedYear: number = new Date().getFullYear();
  static allPurchases: any = [];
  static currentYearPurchases: any = [];
  static loaded: boolean = false;
  static $yearInput: any;
  static publicSelectedYear: number = new Date().getFullYear();

  async ngOnInit() {
    await this.getAllCustomer();
  }

  async getAllCustomer() {
    this.unSubCustomers = onSnapshot(
      collection(this.firestore, 'customers'),
      async (list) => {
        DashboardComponent.allCustomers = [];
        list.forEach((obj) => {
          let customer: Customer = obj.data() as any;
          customer['id'] = obj.id;
          DashboardComponent.allCustomers.push(customer);
        });
        await this.getAllPurchases();
      }
    );
  }

  async getAllPurchases() {
    DashboardComponent.allPurchases = [];
    DashboardComponent.currentYearPurchases = [];
    DashboardComponent.allCustomers.forEach((customer: { id: string }) => {
      this.unSubPurchases = onSnapshot(
        collection(this.firestore, `customers/${customer.id}/purchases`),
        async (list) => {
          list.forEach((obj) => {
            let purchaseData = obj.data();
            let purchaseDate = new Date(purchaseData['date']);
            let purchaseMonth = this.getMonthLabel(purchaseDate.getMonth());
            let purchaseYear = purchaseDate.getFullYear();
            const existingMonth = DashboardComponent.allPurchases.find(
              (data: { month: string }) => data.month === purchaseMonth
            );
            const existingYear = DashboardComponent.allPurchases.find(
              (data: { year: number }) => data.year === purchaseYear
            );
            if (existingYear) {
              if (existingMonth) {
                existingMonth.total +=
                  purchaseData['price'] * purchaseData['value'];
              } else {
                DashboardComponent.allPurchases.push({
                  year: purchaseYear,
                  month: purchaseMonth,
                  total: purchaseData['price'] * purchaseData['value'],
                });
              }
            } else {
              DashboardComponent.allPurchases.push({
                year: purchaseYear,
                month: purchaseMonth,
                total: purchaseData['price'] * purchaseData['value'],
              });
            }
          });
          await this.getCurrentYearPurchases();
        }
      );
    });
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

  async getCurrentYearPurchases() {
    DashboardComponent.currentYearPurchases = [];
    DashboardComponent.allPurchases.forEach(
      (sales: { year: number; month: string; total: number }) => {
        if (sales.year === this.selectedYear) {
          DashboardComponent.currentYearPurchases.push({
            month: sales.month,
            total: sales.total,
          });
        }
      }
    );
    DashboardComponent.loaded = true;
  }

  checkValue(event: any) {
    this.selectedYear = +event;
    DashboardComponent.publicSelectedYear = +event;
  }

  ngOnDestroy() {
    this.unSubCustomers();
  }
}
