import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
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
export class DashboardComponent implements OnInit {
  selectedYear: number = new Date().getFullYear();

  static $yearInput: any;
  static publicSelectedYear: number = new Date().getFullYear();

  constructor(public firestore: FirestoreService) {}

  async ngOnInit() {

  }

  checkValue(event: any) {
    this.selectedYear = +event;
    DashboardComponent.publicSelectedYear = +event;
  }
}
