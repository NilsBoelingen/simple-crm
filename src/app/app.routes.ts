import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'customer', component: CustomersComponent},
    {path: 'customer/:id', component: CustomerDetailsComponent},
    {path: 'products', component: ProductsComponent}
];
