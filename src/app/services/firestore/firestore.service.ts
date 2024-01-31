import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Customer } from '../../../models/customer.class';
import { CustomerDetailsComponent } from '../../customers/customer-details/customer-details.component';
import { SellProduct } from '../../../models/sell-product.class';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  firestore: Firestore = inject(Firestore);

  unSubCustomers;

  allCustomers: any = [];

  customerCache = new Customer();
  birthDate!: Date;
  loading: boolean = false;

  customerId: string = '';
  unSubCustomer: any;
  unSubCustomerPurchases: any;
  customer: Customer = new Customer();
  CustomerPurchases: any = [];

  constructor(private route: ActivatedRoute) {
    this.unSubCustomers = this.subCustomers();
    this.unSubCustomer = this.subCustomer();
    this.unSubCustomerPurchases = this.subCustomerPurchases();
  }

  subCustomers() {
    return onSnapshot(collection(this.firestore, 'customers'), (list) => {
      this.allCustomers = [];
      list.forEach((obj) => {
        let customerCache: Customer = obj.data() as any;
        customerCache['id'] = obj.id;
        this.allCustomers.push(customerCache);
      });
    });
  }

  async saveCustomer() {
    this.customer.birthDate = this.birthDate ? this.birthDate.getTime() : 0;
    console.log(this.customer);
    this.loading = true;
    const docRef = await addDoc(
      collection(this.firestore, 'customers'),
      this.customer.toJSON()
    );
    this.loading = false;
  }

  subCustomer() {
    return onSnapshot(
      doc(this.firestore, 'customers', this.customerId),
      (customer) => {
        this.customer = new Customer(customer.data());
      }
    );
  }

  subCustomerPurchases() {
    return onSnapshot(
      collection(this.firestore, `customers/${this.customerId}/purchases`),
      (snapshot) => {
        this.CustomerPurchases = [];
        snapshot.forEach((purchaseDoc) => {
          let purchase = new SellProduct(purchaseDoc.data());
          this.CustomerPurchases.push(purchase);
        });
      }
    );
  }

  async saveNote() {
    this.loading = true;
    await updateDoc(
      doc(collection(this.firestore, 'customers'), this.customerId),
      this.customer.toJSON()
    ).then(() => {
      this.loading = false;
    });
  }

  async getCustomerId() {
    this.route.paramMap.subscribe((paramMap) => {
      this.customerId = paramMap.get('id')!.toString();
    });
  }

  ngOnDestroy() {
    this.unSubCustomers();
    this.unSubCustomer();
    this.unSubCustomerPurchases();
  }
}
