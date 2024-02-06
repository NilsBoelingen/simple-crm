import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard.component';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-best-products',
  standalone: true,
  imports: [DashboardComponent, MatCardModule, CommonModule],
  templateUrl: './best-products.component.html',
  styleUrl: './best-products.component.scss',
})
export class BestProductsComponent implements OnInit, OnDestroy {
  purchases: any[] = [];
  bestPurchases: any[] = [];
  subscription: any;
  i: number = 0;

  constructor(public firestore: FirestoreService) {}

  ngOnInit(): void {
    this.subscription = this.firestore.allPurchasesSubject.subscribe(
      async (purchases) => {
        this.purchases = purchases;
        this.getSalesValue();
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getSalesValue() {
    this.bestPurchases = [];
    let i = 0;
    this.purchases.forEach((purchase) => {
      this.getProducts(purchase, i);
    });
    this.sortByTotal(this.bestPurchases);
  }

  getProducts(
    purchase: {
      product: string;
      value: string | number;
      price: string | number;
    },
    i: number
  ) {
    const existingProduct = this.bestPurchases.find(
      (product: { product: string }) => product.product === purchase.product
    );
    let value = +purchase.value;
    let price = +purchase.price;
    let total = value * price;
    this.fillArry(existingProduct, purchase, value, total);
  }

  fillArry(existingProduct: { value: any; total: any; }, purchase: { product: any; value?: string | number; price?: string | number; }, value: number, total: number) {
    if (existingProduct) {
      existingProduct.value += value;
      existingProduct.total += total;
    } else {
      if (this.i < 10) {
        this.bestPurchases.push({
          product: purchase.product,
          value: value,
          total: total,
        });
        this.i++
      }
    }
  }

  sortByTotal(array: any[]) {
    array.sort((a, b) => b.total - a.total);
  }
}
