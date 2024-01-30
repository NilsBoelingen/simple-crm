import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-last-sales',
  standalone: true,
  imports: [MatTableModule, DashboardComponent],
  templateUrl: './last-sales.component.html',
  styleUrl: './last-sales.component.scss',
})
export class LastSalesComponent {
  allPurchases: any[] = [];
  displayedColumns: string[] = ['position', 'name', 'product', 'total'];
  dataSource = this.allPurchases;

  ngOnInit() {
    if ( DashboardComponent.loaded) {
      this.lastSalesToArray();
    } else {
      setTimeout(() => {
        this.ngOnInit();
      }, 50);
    }
  }

  lastSalesToArray() {
    DashboardComponent.allPurchases.forEach((purchase: any) => {
      let i = 0;
      i ++;
      console.log('index', i, 'array', DashboardComponent.allPurchases);
    })
  }

  sortByDate(array: any[]) {
    array.sort((a, b) => a.dateInMs - b.dateInMs);
  }
}
