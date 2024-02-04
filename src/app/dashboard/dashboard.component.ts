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
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FirestoreService } from '../services/firestore/firestore.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
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
    BestProductsComponent,
    MatIconModule,
    MatDividerModule,
    MatButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  currentYear: Date = new Date();
  minDate = new Date(2023, 0, 1);
  maxDate = new Date();
  static publicSelectedYear: number = new Date().getFullYear();

  constructor(private firestore: FirestoreService) {}

  @ViewChild('picker', { static: false })
  private picker!: MatDatepicker<Date>;

  chosenYearHandler(ev: Date, input: any) {
    let date = ev.valueOf();
    this.currentYear = new Date(date);
    this.picker.close();
  }

  chooseYear() {
    DashboardComponent.publicSelectedYear = this.currentYear.getFullYear();
    this.firestore.getCurrentYearPurchases();
  }
}
