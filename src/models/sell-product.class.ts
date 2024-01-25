export class SellProduct {
  date: number;
  product: string;
  price: number;
  value: number;

  constructor(obj?: any) {
    this.date = obj ? obj.date : '';
    this.product = obj ? obj.product : '';
    this.price = obj ? obj.price : '';
    this.value  = obj ? obj.value : '';
  }

  toJSON() {
    return {
      date: this.date,
      product: this.product,
      price: this.price,
      value: this.value,
    }
  }
}
