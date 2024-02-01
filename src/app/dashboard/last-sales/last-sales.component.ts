import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-last-sales',
  standalone: true,
  imports: [DashboardComponent, MatCardModule, CommonModule],
  templateUrl: './last-sales.component.html',
  styleUrl: './last-sales.component.scss',
})
export class LastSalesComponent {

  purchases = this.firestore.allPurchases;
  lastPurchases: any[] = [];
  displayedColumns: string[] = ['position', 'name', 'product', 'total'];

  constructor(public firestore: FirestoreService) {}

  lastSalesToArray() {
    this.lastPurchases = [];
    let i = 0;
    this.sortByDate(this.purchases);
    this.firestore.allPurchases.forEach(
      (element: {
        name: string;
        date: Date;
        product: string;
        total: number;
      }) => {
        if (i < 10) {
          this.lastPurchases.push({
            index: i + 1,
            name: element.name,
            date: new Date(element.date).toLocaleDateString('de-DE'),
            product: element.product,
            total: element.total,
          });
          i++;
        }
      }
    );
  }

  sortByDate(array: any[]) {
    array.sort((a, b) => b.date - a.date);
  }
}
