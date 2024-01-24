export class Customer {
    firstName: string;
    lastName: string;
    company?: string;
    email: string;
    telephone: number;
    birthDate: number;
    address: string;
    zipCode: number;
    city: string;
    id?: string;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.company = obj ? obj.company : '';
        this.email = obj ? obj.email : '';
        this.telephone = obj ? obj.telephone : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.address = obj ? obj.address : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.id = obj ? obj.id : '';
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            company: this.company,
            email: this.email,
            telephone: this.telephone,
            birthDate: this.birthDate,
            address: this.address,
            zipCode: this.zipCode,
            city: this.city,
            id: this.id
        }
    }
}
