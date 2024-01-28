import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { Customer } from '../../models/customer.class';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, CanvasJSAngularChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  firestore: Firestore = inject(Firestore);
  unSubCustomers: any;
  unSubPurchases: any;
  allCustomers: any = [];
  allPurchses: any = [];
  monthlySalesData: any[] = [];

  ngOnInit() {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.unSubCustomers = onSnapshot(
      collection(this.firestore, 'customers'),
      (list) => {
        this.allCustomers = [];
        list.forEach((obj) => {
          let customer: Customer = obj.data() as any;
          customer['id'] = obj.id;
          this.allCustomers.push(customer);
        });
        this.getAllPurchases();
      }
    );
  }

  getAllPurchases() {
    this.allCustomers.forEach((customer: { id: string }) => {
        this.unSubPurchases = onSnapshot(collection(this.firestore, `customers/${customer.id}/purchases`), (list) => {
          list.forEach((obj) => {
            let purchaseData = obj.data();
            let purchaseDate = new Date(purchaseData['date'])
            let purchaseMonth = this.getMonthLabel(purchaseDate.getMonth());
            const existingMonthData = this.monthlySalesData.find((data) => data.month === purchaseMonth);
            if (existingMonthData) {
              existingMonthData.total += purchaseData['price'] * purchaseData['value'];
            } else {
              this.monthlySalesData.push({
                month: purchaseMonth,
                total: purchaseData['price'] * purchaseData['value'],
              });
            };
            console.log(this.monthlySalesData);

          })
      })
    });
  }

  getMonthLabel(month: number): string {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    return months[month];
  }

  ngOnDestroy() {
    this.unSubCustomers();
  }

  monthlySales = {
    title: {
      text: 'Monthly Sales Data',
    },
    theme: 'light2',
    animationEnabled: true,
    exportEnabled: true,
    axisY: {
      includeZero: true,
      valueFormatString: '#,###,##0 €',
    },
    data: [
      {
        type: 'bar', //change type to bar, line, area, pie, etc
        yValueFormatString: '#,###,##0 €',
        color: '#01b8aa',
        dataPoints: [
          { label: 'Jan', y: 172 },
          { label: 'Feb', y: 189 },
          { label: 'Mar', y: 201 },
          { label: 'Apr', y: 240 },
          { label: 'May', y: 166 },
          { label: 'Jun', y: 196 },
          { label: 'Jul', y: 218 },
          { label: 'Aug', y: 167 },
          { label: 'Sep', y: 175 },
          { label: 'Oct', y: 152 },
          { label: 'Nov', y: 156 },
          { label: 'Dec', y: 164 },
        ],
      },
    ],
  };
}
