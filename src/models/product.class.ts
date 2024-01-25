export class Product {
  name: string;
  description: string;
  prozessor: string;
  mainboard: string;
  gpu: string;
  ram:string;
  ssd: string;
  power: string;
  price:number;
  id?: string;

  constructor(obj?: any) {
    this.name = obj ? obj.name : '';
    this.description = obj ? obj.description : '';
    this.prozessor = obj ? obj.prozessor : '';
    this.mainboard = obj ? obj.mainboard : '';
    this.gpu = obj ? obj.gpu : '';
    this.ram = obj ? obj.ram : '';
    this.ssd = obj ? obj.ssd : '';
    this.power = obj ? obj.power : '';
    this.price = obj ? obj.price : '';
    this.id = obj ? obj.id : '';
  }

  toJSON() {
    return {
      name: this.name,
      description: this.description,
      prozessor: this.prozessor,
      mainboard: this.mainboard,
      gpu: this.gpu,
      ram: this.ram,
      ssd: this.ssd,
      power: this.power,
      price: this.price,
      id: this.id,
    }
  }
}
