import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Customer } from '../../../models/customer.class';
import { SellProduct } from '../../../models/sell-product.class';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../models/product.class';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  firestore: Firestore = inject(Firestore);

  unSubCustomers;
  unSubProductsList;

  allCustomers: any = [];
  customerCache = new Customer();
  birthDate!: Date;
  loading: boolean = false;
  newCustomer: Customer = new Customer();
  unSubCustomer: any;
  unSubCustomerPurchases: any;
  customer: Customer = new Customer();
  CustomerPurchases: any = [];
  productList: any = [];
  currentProduct: Product = new Product();
  sellingProduct: SellProduct = new SellProduct();
  allPurchases: any = [];
  unSubPurchases: any;

  constructor(private route: ActivatedRoute) {
    this.unSubCustomers = this.subCustomers();
    this.unSubProductsList = this.subProductsList();
  }

  subCustomers() {
    return onSnapshot(collection(this.firestore, 'customers'), (list) => {
      this.allCustomers = [];
      list.forEach((obj) => {
        let customerCache: Customer = obj.data() as any;
        customerCache['id'] = obj.id;
        this.allCustomers.push(customerCache);
      });
      this.subAllPurchases();
    });
  }

  async subAllPurchases() {
    this.allPurchases = [];
    this.allCustomers.forEach(
      (customer: { lastName: string; firstName: string; id: string }) => {
        this.unSubPurchases = onSnapshot(
          collection(this.firestore, `customers/${customer.id}/purchases`),
          async (list) => {
            list.forEach((obj) => {
              let purchaseData = obj.data();
              let purchaseDate = new Date(purchaseData['date']);
              this.allPurchases.push({
                name: customer.firstName + customer.lastName,
                product: purchaseData['name'],
                price: purchaseData['price'],
                value: purchaseData['value'],
                date: purchaseDate,
              });
              console.log(this.allPurchases);
            });
          }
        );
      }
    );
  }

  async saveCustomer() {
    this.newCustomer.birthDate = this.birthDate ? this.birthDate.getTime() : 0;
    this.loading = true;
    const docRef = await addDoc(
      collection(this.firestore, 'customers'),
      this.newCustomer.toJSON()
    );
    this.loading = false;
  }

  subCustomer(id: string) {
    return onSnapshot(doc(this.firestore, 'customers', id), (customer) => {
      this.customer = new Customer(customer.data());
    });
  }

  subCustomerPurchases(id: string) {
    return onSnapshot(
      collection(this.firestore, `customers/${id}/purchases`),
      (snapshot) => {
        this.CustomerPurchases = [];
        snapshot.forEach((purchaseDoc) => {
          let purchase = new SellProduct(purchaseDoc.data());
          this.CustomerPurchases.push(purchase);
        });
      }
    );
  }

  async saveNote(id: string) {
    this.loading = true;
    await updateDoc(
      doc(collection(this.firestore, 'customers'), id),
      this.customer.toJSON()
    ).then(() => {
      this.loading = false;
    });
  }

  async saveCustomerEdits(id: string, customer: Customer) {
    if (!customer.note) {
      customer.note = '';
    }
    await updateDoc(
      doc(collection(this.firestore, 'customers'), id),
      customer.toJSON()
    ).then(() => {
      this.loading = false;
    });
  }

  subProductsList() {
    return onSnapshot(collection(this.firestore, 'products'), (list) => {
      this.productList = [];
      list.forEach((obj) => {
        let product: Product = new Product(obj.data());
        product['id'] = obj.id;
        this.productList.push(product);
      });
    });
  }

  async saveNewProduct(product: Product) {
    this.loading = true;
    const docRef = await addDoc(
      collection(this.firestore, 'products'),
      product.toJSON()
    );
    this.loading = false;
  }

  async saveEditProduct(id: string, product: Product) {
    this.loading = true;
    await updateDoc(
      doc(collection(this.firestore, 'products'), id),
      product.toJSON()
    ).then(() => {
      this.loading = false;
    });
  }

  async deleteUser(i: number) {
    await deleteDoc(doc(this.firestore, 'customers', this.allCustomers[i].id));
  }

  async deleteProduct(i: number) {
    await deleteDoc(doc(this.firestore, 'products', this.productList[i].id));
  }

  async getSingleProduct(id: string) {
    return onSnapshot(doc(this.firestore, 'products', id), (product) => {
      this.currentProduct = new Product(product.data());
      this.sellingProduct.price = this.currentProduct.price;
    });
  }

  async sellProduct(id: string) {
    this.loading = true;
    this.sellingProduct.name = this.currentProduct.name;
    this.sellingProduct.date = new Date().getTime();
    const docRef = await addDoc(
      collection(this.firestore, `customers/${id}/purchases`),
      this.sellingProduct.toJSON()
    );
    this.loading = false;
  }

  ngOnDestroy() {
    this.unSubCustomers();
    this.unSubCustomer();
    this.unSubCustomerPurchases();
  }
}
