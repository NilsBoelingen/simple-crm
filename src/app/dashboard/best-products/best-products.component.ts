import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard.component';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-best-products',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './best-products.component.html',
  styleUrl: './best-products.component.scss'
})
export class BestProductsComponent {

  constructor(public firestore: FirestoreService) {}

  getSalesValue() {
    // errechnet die gesamte Verkaufmenge pro Produkt und speichert es in einem Array
  }
}
