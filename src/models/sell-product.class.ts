export class SellProduct {
  date: number;
  name: string;
  price: number;
  value: number;

  constructor(obj?: any) {
    this.date = obj ? obj.date : '';
    this.name = obj ? obj.name : '';
    this.price = obj ? obj.price : 0;
    this.value  = obj ? obj.value : 0;
  }

  toJSON() {
    return {
      date: this.date,
      name: this.name,
      price: this.price,
      value: this.value,
    }
  }
}
