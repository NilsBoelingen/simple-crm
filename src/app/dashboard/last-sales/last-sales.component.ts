import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class LastSalesComponent implements OnInit, OnDestroy {

  purchases: any[] = [];
  lastPurchases: any[] = [];
  subscription: any;

  constructor(public firestore: FirestoreService) {}

  async ngOnInit() {
    this.subscription = this.firestore.currentYearPurchasesSubject.subscribe(
      async (purchases) => {
        this.purchases = purchases;
        this.lastSalesToArray();
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  lastSalesToArray() {
    this.lastPurchases = [];
    let i = 0;
    this.sortByDate(this.purchases);
    this.purchases.forEach(
      (element: { name: string; date: Date; product: string; total: number; }) => {
        if (i < 10) {
          this.fillArray(i, element)
          i++;
        }
      }
    );
  }

  fillArray(i: number, element: { name: any; date: string | number | Date; product: any; total: any; }) {
    this.lastPurchases.push({
      index: i + 1,
      name: element.name,
      date: new Date(element.date).toLocaleDateString('de-DE'),
      product: element.product,
      total: element.total,
    });
  }

  sortByDate(array: any[]) {
    array.sort((a, b) => b.date - a.date);
  }
}
